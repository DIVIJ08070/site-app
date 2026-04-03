#!/bin/bash
# Send login request to get a token
RESPONSE=$(curl -s -X POST http://65.1.14.3:3323/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@company.com","password":"password"}')

# Assuming the backend returns {"success":true,"data":{"accessToken":"ey..."}}
# or something similar. Let's just grab the token using grep
TOKEN=$(echo $RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d '"' -f 4)

if [ -z "$TOKEN" ]; then
  # Maybe the token is just token?
  TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d '"' -f 4)
fi

echo "Token: $TOKEN"

echo "Testing snake_case POST"
curl -s -X POST http://65.1.14.3:3323/api/auditor \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"full_name":"Test User","email":"test_snake@example.com","phone":"1234567890","dob":"1990-01-01","gender":"Male","company_name":"test","status":1}'

echo -e "\nTesting camelCase POST"
curl -s -X POST http://65.1.14.3:3323/api/auditor \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"fullName":"Test User","email":"test_camel@example.com","phoneNumber":"1234567890","dateOfBirth":"1990-01-01","gender":"Male","companyName":"test","status":1}'
