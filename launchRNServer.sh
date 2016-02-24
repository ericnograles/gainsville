###############################################
#   Prerequisites:
#     * Installed NVM
#     * npm install -g gulp react-native
###############################################

# Add a reference to nvm
export NVM_DIR=~/.nvm
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Parse command line arguments
while [[ $# > 1 ]]
do
key="$1"

case $key in
    -e|--env)
    ENVIRONMENT="$2"
    shift # past argument
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

# Check prerequisites
echo "Starting for ${ENVIRONMENT}"

# Kill all node instances
pkill node

# Install NVM
nvm install 4.2.6
nvm use 4.2.6

# Use npm@3.7.2
npm install -g npm@3.7.2

# npm install
npm cache clean && npm install

# TODO: Remove the line below when RN 0.20 drops
find . -name 'fbjs' -print | grep "\./node_modules/fbjs" -v | xargs rm -rf

# Run gulp based on environment variable
gulp --env ${ENVIRONMENT}

# Android consideration
adb reverse tcp:8081 tcp:8081

# Start the React Native server
react-native start