#!/bin/bash

git add .
git commit -am "DEPLOY_PREP"
git push -u origin develop

cd api/
echo "Deploying on dsmun-backend"
npm run deploy

cd ../website
echo "Deploying dsmun-website"
npm run deploy

cd ../frontend
echo "Deploying dsmun-frontend"
npm run deploy

echo "ALL SYSTEMS DEPLOYED"
