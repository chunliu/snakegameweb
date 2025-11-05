#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

IMAGE_TAG=$1
RELEASE_NAME="sgw-release"
CHART_PATH="./helm-chart"
NAMESPACE="snakegame" # Or specify the namespace if needed

echo "Checking for existing Helm release: $RELEASE_NAME in namespace $NAMESPACE..."

# Check if the Helm release exists in the specified namespace
if helm list --namespace $NAMESPACE -q --filter "^${RELEASE_NAME}$"; then
  echo "Release '$RELEASE_NAME' found. Uninstall it ..."
  helm uninstall $RELEASE_NAME --namespace $NAMESPACE 
fi

echo "Helm deployment finished for tag: $IMAGE_TAG"