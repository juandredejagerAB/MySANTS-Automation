import "dotenv/config";

export interface EnvironmentConfig {
  adminUsername: string;
  adminPassword: string;
  provinceOption: string;
  notranscriptStudent: string;
  transcriptStudent: string;
  academicRecordStudent: string;
  academicRecordPeriod: string;
  addstudentPeriod: string;
  markerUser: string;
  assessorUser: string;
  willStudent: string;
  dbhost: string;
  dbuser: string;
  dbpassword: string;
  dbname: string;
}

export const environmentSecrets = {
  DEV: {
    adminUsername: process.env.DEV_ADMIN_USERNAME ?? "",
    adminPassword: process.env.DEV_ADMIN_PASSWORD ?? "",
    provinceOption: process.env.DEV_PROVINCE_OPTION ?? "",
    notranscriptStudent: process.env.DEV_NOTRANSCRIPT_STUDENT ?? "",
    transcriptStudent: process.env.DEV_TRANSCRIPT_STUDENT ?? "",
    academicRecordStudent: process.env.DEV_ACADEMIC_RECORD_STUDENT ?? "",
    academicRecordPeriod: process.env.DEV_ACADEMIC_RECORD_PERIOD ?? "",
    addstudentPeriod: process.env.DEV_ADDSTUDENT_PERIOD ?? "",
    markerUser: process.env.DEV_MARKER_USER ?? "",
    assessorUser: process.env.DEV_ASSESSOR_USER ?? "",
    willStudent: process.env.DEV_WILL_STUDENT ?? "",
    dbhost: process.env.DEV_DBHOST ?? "",
    dbuser: process.env.DEV_DBUSER ?? "",
    dbpassword: process.env.DEV_DBPASSWORD ?? "",
    dbname: process.env.DEV_DBNAME ?? "",
  },
  UAT: {
    adminUsername: process.env.UAT_ADMIN_USERNAME ?? "",
    adminPassword: process.env.UAT_ADMIN_PASSWORD ?? "",
    provinceOption: process.env.UAT_PROVINCE_OPTION ?? "",
    notranscriptStudent: process.env.UAT_NOTRANSCRIPT_STUDENT ?? "",
    transcriptStudent: process.env.UAT_TRANSCRIPT_STUDENT ?? "",
    academicRecordStudent: process.env.UAT_ACADEMIC_RECORD_STUDENT ?? "",
    academicRecordPeriod: process.env.UAT_ACADEMIC_RECORD_PERIOD ?? "",
    addstudentPeriod: process.env.UAT_ADDSTUDENT_PERIOD ?? "",
    markerUser: process.env.UAT_MARKER_USER ?? "",
    assessorUser: process.env.UAT_ASSESSOR_USER ?? "",
    willStudent: process.env.UAT_WILL_STUDENT ?? "",
    dbhost: process.env.UAT_DBHOST ?? "",
    dbuser: process.env.UAT_DBUSER ?? "",
    dbpassword: process.env.UAT_DBPASSWORD ?? "",
    dbname: process.env.UAT_DBNAME ?? "",
  },
  STG: {
    adminUsername: process.env.STG_ADMIN_USERNAME ?? "",
    adminPassword: process.env.STG_ADMIN_PASSWORD ?? "",
    provinceOption: process.env.STG_PROVINCE_OPTION ?? "",
    notranscriptStudent: process.env.STG_NOTRANSCRIPT_STUDENT ?? "",
    transcriptStudent: process.env.STG_TRANSCRIPT_STUDENT ?? "",
    academicRecordStudent: process.env.STG_ACADEMIC_RECORD_STUDENT ?? "",
    academicRecordPeriod: process.env.STG_ACADEMIC_RECORD_PERIOD ?? "",
    addstudentPeriod: process.env.STG_ADDSTUDENT_PERIOD ?? "",
    markerUser: process.env.STG_MARKER_USER ?? "",
    assessorUser: process.env.STG_ASSESSOR_USER ?? "",
    willStudent: process.env.STG_WILL_STUDENT ?? "",
    dbhost: process.env.STG_DBHOST ?? "",
    dbuser: process.env.STG_DBUSER ?? "",
    dbpassword: process.env.STG_DBPASSWORD ?? "",
    dbname: process.env.STG_DBNAME ?? "",
  },
  PROD: {
    adminUsername: process.env.PROD_ADMIN_USERNAME ?? "",
    adminPassword: process.env.PROD_ADMIN_PASSWORD ?? "",
    provinceOption: process.env.PROD_PROVINCE_OPTION ?? "",
    notranscriptStudent: process.env.PROD_NOTRANSCRIPT_STUDENT ?? "",
    transcriptStudent: process.env.PROD_TRANSCRIPT_STUDENT ?? "",
    academicRecordStudent: process.env.PROD_ACADEMIC_RECORD_STUDENT ?? "",
    academicRecordPeriod: process.env.PROD_ACADEMIC_RECORD_PERIOD ?? "",
    addstudentPeriod: process.env.PROD_ADDSTUDENT_PERIOD ?? "",
    markerUser: process.env.PROD_MARKER_USER ?? "",
    assessorUser: process.env.PROD_ASSESSOR_USER ?? "",
    willStudent: process.env.PROD_WILL_STUDENT ?? "",
    dbhost: process.env.PROD_DBHOST ?? "",
    dbuser: process.env.PROD_DBUSER ?? "",
    dbpassword: process.env.PROD_DBPASSWORD ?? "",
    dbname: process.env.PROD_DBNAME ?? "",
  },
} as const;
