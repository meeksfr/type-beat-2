from .AbstractAnalyzer import AbstractAnalyzer
import re

class YouTubeDescriptionAnalyzer(AbstractAnalyzer):
    '''
    class for analyzing a beat from a YouTube video description
    '''
    def __init__(self):
        super().__init__()

    def bpm(self, description: str) -> int:
        '''
        returns the BPM of the beat if present in the description
        '''
        pattern = re.compile(
            r"""
            \b
            (?:
                (\d{2,3})     # Capture a 2- or 3-digit number (BPM value)
                \s*           # Allow optional spaces
                [^\w\n]{0,3}  # Allow up to 3 non-word, non-newline characters (like dashes or colons)
                \s*           # Allow optional spaces
                bpm           # Match 'bpm'
                |
                bpm           # Match 'bpm' first
                \s*           # Allow optional spaces
                [^\w\n]{0,3}  # Allow up to 3 non-word, non-newline characters
                \s*           # Allow optional spaces
                (\d{2,3})     # Capture a 2- or 3-digit number (BPM value)
            )
            \b
            """, 
            re.IGNORECASE | re.VERBOSE
        )

        match = pattern.search(description)
        if match:
            return 200, int(match.group(1) or match.group(2))
        return 204, None

    def key(self, description: str) -> str:
        '''
        returns the key of the beat if present in the description
        '''
        pattern = re.compile(
        r"""
        (?<!\w)           # Ensure it's not part of a word
        (?i:([A-G]))      # Case-insensitive match for A-G
        ([#b]?)           # Optionally match sharp (#) or flat (b)
        \s*               # Allow spaces (sometimes written as "C  Major")
        ([-+])?           # Optionally match "-" (minor) or "+" (major)
        \s*               # Allow spaces between symbols and mode
        (?:               # Group for major/minor detection (optional)
            (?i:(maj|min))    # Case-insensitive "maj" or "min"
            |               # OR
            (?i:(major|minor)) # Case-insensitive "major" or "minor"
            |               # OR
            (M|m)           # Case-sensitive M (Major) vs. m (Minor)
        )?
        (?!\w)            # Ensure it's not part of a larger word (prevents false positives)
        """,
        re.VERBOSE  # Apply VERBOSE mode
        )

        matches = pattern.finditer(description)
        for match in matches:
            if match.group(1):
                note = match.group(1).upper()  # Convert note to uppercase for consistency
                accidental = match.group(2) if match.group(2) else ""  # "#" or "b"
                symbol = match.group(3) if match.group(3) else ""  # "+" for major, "-" for minor
                
                # Handle the modality groups
                explicit_modality = ""
                shorthand_modality = ""
                letter_modality = ""
                
                
                # Check which modality group was matched
                try:
                    if match.group(4) or match.group(5):  # maj/min
                        shorthand_modality = match.group(4) or match.group(5)
                    elif match.group(6) or match.group(7):  # major/minor
                        explicit_modality = match.group(6) or match.group(7)
                    elif match.group(8) or match.group(9):  # M/m
                        letter_modality = match.group(8) or match.group(9)
                except IndexError:
                    # If any group doesn't exist, just continue with the default modality
                    pass

                # Skip matches that are just a single letter (e.g., "A" as an article)
                if not (accidental or symbol or explicit_modality or shorthand_modality or letter_modality):
                    continue # Ignore and move to the next match

                if explicit_modality:
                    modality = explicit_modality.lower()
                elif shorthand_modality:
                    modality = "major" if shorthand_modality.lower() == "maj" else "minor"
                elif letter_modality:
                    modality = "major" if letter_modality == "M" else "minor"
                elif symbol:
                    modality = "major" if symbol == "+" else "minor"
                else:
                    modality = "major"  # Default assumption if no modality is given

                return 200, f"{note}{accidental}", modality.capitalize()
        return 204, None, None
