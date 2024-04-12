const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "iteration3-e8be7",
  private_key_id: "a6a768971e5713c5773757efaca3210b2120cd92",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCoKrTgcBXtheS6\ndfUow9kabLcOmgQaCaLU+0f0mEuteZ0UVyXMQ4m9suQC+moKN+GzU/CqlcSPqTUO\nzxSxlNnnIu0PFulugN8CiJ/TT0RRS1570adxl3jxozgRmpS0CHC3o1ddxmi2QXiu\nKOU858/kbx250hkNoGL9Q1Ch9VBId7j7bNBWhvtkaNdzMtHvdHr4p+5W98Pa05RM\nV6azXHtpvm+uzy0n0eN0Go7LYoIAQx9uvfL9X0/tSGi1cUNA1c5m/TwyMr+vFKlE\nrmjx2L1NVCtpA1+U3vDlo9zt20swpXF9jvi+4qRfDoj83MIEchDrbF4cRkgI5pKp\nWr7Bq+ZXAgMBAAECggEAMBgeqL2Fl+ueEbGgjqsMUSFcbSGhIK0204CWAJ75rcBF\nK0cNOVDreMRLr4pcf1WiB/5uquqwT4HN+dFBktQGSbNUZudflUnn/bqDMxTNbg6H\nFBROtg7i+QB8DZTPCHoNeoeNefU/hzhMQkrR3MxTSXp53uX2Yk5HYTU6P0eAUWjs\n/sPZLKwXW2Rr1ZAK1yw+LL/n34uhf/JAUcA6XZHNJbvotl36mfLPUnLN0rLIRxtG\ns8Ux5hEtqxJnJNsQM86KiXwC9qs3YxEB+jXP87YWtZiqG7gnV6idlcZV5nKoV+zw\nAjWDVAdkXtje4ZZ2nV2DdoXgBw0+wo+670w4LOuh0QKBgQDg4mW+7yYuxqgg4bOb\nRlgi6Jtn9Cj/A3vSOYzzvgeHNQHtJCvHTLwHxnMUP5heTo9u6CjVvuIyU9afir7h\n2Op+6i9xraKn8rsUDCvTZHUWxgRit0VNw/qfwyMSN6saVE1z+LKBY9xks49R/lGm\nsIuXvJXS2T0Pkg60PXGm3f5lqQKBgQC/b1LfhCAgTvlWgkF8TU+uaVHAQ6VbHfXW\nUK8we2oWX0EZkp53tVdttfTyE+o5MayCASQYYMwzmYaEMCvGnd+dOyBrIbbeRVav\nzA0lksUm/Ywvgn6OmhvET54z8G8QQATkr5rfAIOINOJBfctW73tTR8KU3V9hajPW\ng04oxO9r/wKBgEtt5K68TFRYMcCFs9abK6jZ2HZvwOh4ZKnIv+xpiuDg+Lpv7Xc1\n18PL3oGmKxdGxnluyXOYSQqUcGKnCQt71HupVSyODwbCNdmtk22ePl/bH1F1I3vI\nBmJb84GCxpNYP3psqoMX2a61Q5c+9Ggywz+r85z7XK3CUchG674Kq++xAoGALe+a\npUPhKZ+JuTZ8XEV471MaaNZSoXCpAwpNX4bdyAyHZImIORVsq0jURBp/Q8YlrPR1\nItxnY6JdYu7kMj7D38jGWK64YNGmoXyHUxLK+DYzI1te3v0f2JV6UuBI5k9WXUG+\nGfDXnyGBgVGcL3o7z5oSmQId1xRS6BCN+r527SUCgYEAp55SAnZHm9ptCfD/Z8Kh\nGZ4KMEvcLoAq9OwAU+sdEmJn+pos+TazDV+KsYwGqGZtCIQHwfcVRPIKhlH1UpQq\nJylbutyr1VvVpL+SU8HCYBs0DsIC80NR5EyWSarOtujxshQTs1X4TwcowRh4kSXH\nY3S4uutWhf1Z1BOnfV2ay1A=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-e4lqb@iteration3-e8be7.iam.gserviceaccount.com",
  client_id: "106654541536933919733",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e4lqb%40iteration3-e8be7.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
