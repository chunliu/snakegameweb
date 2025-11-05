#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if an image tag argument is provided
if [ -z "$1" ]; then
  echo "Error: Image tag must be provided as the first argument."
  echo "Usage: ./deploy.sh <image-tag>"
  exit 1
fi

IMAGE_TAG=$1
RELEASE_NAME="sgw-release"
CHART_PATH="./helm-chart"
NAMESPACE="snakegame" # Or specify the namespace if needed

echo "Checking for existing Helm release: $RELEASE_NAME in namespace $NAMESPACE..."

# Check if the Helm release exists in the specified namespace
if helm list --namespace $NAMESPACE -q --filter "^${RELEASE_NAME}$"; then
  echo "Release '$RELEASE_NAME' found. Upgrading..."
  helm upgrade $RELEASE_NAME $CHART_PATH \
    --namespace $NAMESPACE \
    --set image.tag=$IMAGE_TAG \
    --install # --install flag ensures it installs if upgrade fails because release was deleted manually
    --create-namespace
else
  echo "Release '$RELEASE_NAME' not found. Installing..."
  helm install $RELEASE_NAME $CHART_PATH \
    --namespace $NAMESPACE \
    --set image.tag=$IMAGE_TAG \
    --create-namespace
fi

echo "Helm deployment finished for tag: $IMAGE_TAG"