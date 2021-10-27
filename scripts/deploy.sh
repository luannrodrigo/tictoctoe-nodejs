#!/bin/sh

echo "restart app"
su -u ubuntu pm2 restart 0
