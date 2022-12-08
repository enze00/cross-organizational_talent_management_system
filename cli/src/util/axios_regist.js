import axios from "axios";

function buildAccount() {
  console.log("调用了buildAccount接口")
  const user_phone = window.localStorage.getItem("user_phone")
  const note = window.localStorage.getItem("note")
  const user_pwd = window.localStorage.getItem("user_pwd")
  return axios.post("/build_account",{user_phone:user_phone, note:note, user_pwd:user_pwd})
}

function buildUserInfo() {
  console.log("调用了buildUserInfo接口")
  const user_phone = window.localStorage.getItem("user_phone")
  const user_name = window.localStorage.getItem("user_name")
  const user_sex = window.localStorage.getItem("user_sex")
  const user_marry_status = window.localStorage.getItem("user_marry_status")
  const user_card_id = window.localStorage.getItem("user_card_id")
  const user_birth = window.localStorage.getItem("user_birth")
  const user_work_time = window.localStorage.getItem("user_pwd")
  return axios.post("/web/cirrus/user-info/register",{user_phone:user_phone, user_name:user_name, user_sex:user_sex,
    user_marry_status:user_marry_status, user_card_id:user_card_id,
    user_birth:user_birth,user_work_time:user_work_time})
}

function buildResume() {
  console.log("调用了buildResume接口")
  const user_phone = window.localStorage.getItem("user_phone")
  const resume_edu_schoolName = window.localStorage.getItem("resume_edu_schoolName")
  const resume_edu_qualification = window.localStorage.getItem("resume_edu_qualification")
  const resume_edu_isDay = window.localStorage.getItem("resume_edu_isDay")
  const resume_edu_specialty = window.localStorage.getItem("resume_edu_specialty")
  const resume_edu_time = window.localStorage.getItem("resume_edu_time")
  const resume_certificate_title = window.localStorage.getItem("resume_certificate_title")
  const resume_edu_experience = window.localStorage.getItem("resume_edu_experience")
  const resume_work_company_name = window.localStorage.getItem("resume_work_company_name")
  const resume_work_pro = window.localStorage.getItem("resume_work_pro")
  const resume_work_job_name = window.localStorage.getItem("resume_work_job_name")
  const resume_work_time = window.localStorage.getItem("resume_work_time")
  const resume_work_skill = window.localStorage.getItem("resume_work_skill")
  const resume_work_msg = window.localStorage.getItem("resume_work_msg")
  return axios.post("/build_resume",{user_phone:user_phone, resume_edu_schoolName:resume_edu_schoolName, resume_edu_qualification:resume_edu_qualification,
                                                      resume_edu_isDay:resume_edu_isDay, resume_edu_specialty:resume_edu_specialty, resume_edu_time:resume_edu_time,
                                                      resume_certificate_title:resume_certificate_title,resume_edu_experience:resume_edu_experience,resume_work_company_name:resume_work_company_name,
                                                      resume_work_pro:resume_work_pro,resume_work_job_name:resume_work_job_name,resume_work_time:resume_work_time,
                                                      resume_work_skill:resume_work_skill,resume_work_msg:resume_work_msg})
}

function buildCompany(){
  console.log("调用了buildCompany接口")
  const user_phone = window.localStorage.getItem("user_phone")
  const company_title = window.localStorage.getItem("company_title")
  const company_pro = window.localStorage.getItem("company_pro")
  const company_people_number = window.localStorage.getItem("company_people_number")
  const company_place = window.localStorage.getItem("company_place")
  const company_license_type = window.localStorage.getItem("company_license_type")
  const company_license_text = window.localStorage.getItem("company_license_text")
  return axios.post("/build_company",{user_phone:user_phone, company_title:company_title, company_pro:company_pro,
    company_people_number:company_people_number, company_place:company_place,
    company_license_type:company_license_type,company_license_text:company_license_text})
}

function joinCompany_manuallyAdd(){
  console.log("调用了joinCompany_manuallyAdd接口")
  const user_phone = window.localStorage.getItem("user_phone")
  const company_title = window.localStorage.getItem("company_title")
  const company_province = window.localStorage.getItem("company_province")
  const company_employee_role = window.localStorage.getItem("company_employee_role")
  const company_employee_apart = window.localStorage.getItem("company_employee_apart")
  const company_employee_position = window.localStorage.getItem("company_employee_position")
  return axios.post("/joinCompany_manuallyAdd",{user_phone:user_phone, company_title:company_title, company_employee_role:company_employee_role,
    company_employee_apart:company_employee_apart, company_employee_position:company_employee_position})
}

function joinCompany_invitationCode(){
  console.log("调用了joinCompany_invitationCode接口")
  const user_phone = window.localStorage.getItem("user_phone")
  const invitation_code = window.localStorage.getItem("invitation_code")
  return axios.post("/joinCompany_invitationCode",{user_phone:user_phone, invitation_code:invitation_code})
}

export {
  buildAccount,
  buildUserInfo,
  buildResume,
  buildCompany,
  joinCompany_manuallyAdd,
  joinCompany_invitationCode
}