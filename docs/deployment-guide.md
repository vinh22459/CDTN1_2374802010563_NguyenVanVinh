# Deployment Guide — Mekong Mobile CRM

## 1. Environment Requirements
- **OS:** Ubuntu 22.04 LTS / macOS / Windows 11 (WSL2)
- **Runtime:** Docker Engine (v24.0+) & Docker Compose (v2.20+)
- **Ports Required:** Port `3000` must be available.
- **Disk Space:** At least 500MB free space.

## 2. Step-by-Step Installation & Deployment
Clone the repository to an empty directory and launch the system using **exactly 2 commands**:

\`\`\`bash
# 1. Clone repository with tag v1.0 into an empty folder
git clone --branch v1.0 https://github.com/vinh22459/CDTN1_2374802010563_NguyenVanVinh.git .

# 2. Build and start containers in detached mode
docker compose up -d --build
\`\`\`

## 3. Environment Variables (.env)
Create a \`.env\` file in the root directory if needed (optional for default local setup):
| Variable Name | Description | Default Value | Required |
| :--- | :--- | :--- | :--- |
| \`PORT\` | Port on which the Express server listens | \`3000\` | No |
| \`NODE_ENV\` | Application runtime environment | \`production\` | No |

## 4. Seed Data & Sample Records
- Initial sample data is pre-bundled in \`src/config/tickets_data.json\`.
- Upon startup, the application automatically loads existing records. You can verify records by accessing the web interface or API endpoints.

## 5. Verification & Health Check
Run the following command to check container status:
\`\`\`bash
docker compose ps
\`\`\`
*Expected result:* The service `crm-app` must be in the `healthy` state.

To test the web application endpoint locally:
\`\`\`bash
curl -s http://localhost:3000/
\`\`\`
*Expected result:* Returns the HTML content of the dashboard login/management interface.