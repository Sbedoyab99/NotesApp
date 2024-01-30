# Set up environment variables for the backend
export NODE_ENV=environment
export DB_HOST=DBhost
export DB_USER=DBuser
export DB_PASS=DBpassword
export DB_PORT=DBport
export DB_NAME=DBname

## 
export PORT=3000  # Port for the backend server (DON'T CHANGE IT)

# Crate database
MYSQL_CMD="mysql -u${DB_USER} -p${DB_PASS}"

echo "Creating database..."
$MYSQL_CMD -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"

# Verify if the database is created successfully
DB_EXISTS=$($MYSQL_CMD -e "SHOW DATABASES LIKE '${DB_NAME}';" | grep "${DB_NAME}")

if [ -n "$DB_EXISTS" ]; then
  echo "Database ${DB_NAME} created successfully."
else
  echo "Failed to create database ${DB_NAME}."
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Start the backend server
echo "Starting backend server..."
npm start &

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Build the React app
echo "Building the frontend app..."
npm run build

# Start the frontend server
echo "Starting frontend server..."
npm run dev