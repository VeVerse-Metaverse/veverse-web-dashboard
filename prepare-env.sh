#!/bin/sh

cat > env.js << EOF
window.ENVIRONMENT="${ENVIRONMENT}"
EOF
