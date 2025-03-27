

# Backing Track

A web application for finding, analyzing, and downloading "type beats" based on user taste, in order to quickly start up recording sessions.


https://github.com/user-attachments/assets/06820e27-d98d-418b-9c86-92b41f8ebadf


### Backend

- Flask (Python)
- Located in the `backend` directory
- Each major feature has its own module and blueprint in the `routes` directory

### Frontend

- React (TypeScript)
- Located in the `backing-track-2` directory
- Single-page application architecture with separation between:
  - `src/components/`: UI components
  - `src/services/`: API layer
  - `src/pages/`: Page Layout
  - `src/types/`: Type definitions
