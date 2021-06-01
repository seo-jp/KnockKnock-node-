const blank = /[\s]/g
const idChk = /^[A-Za-z0-9]{4,15}$/ // 영문,숫자 4~15자
const pwdChk = /^.*(?=^.{8,30}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/  // 영문,숫자,특수문자 꼭 하나이상 사용 8~30자
const nameChk = /^[가-힣A-Za-z]{2,15}$/
const mailChk = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/
const telChk = /^\d{3}\d{3,4}\d{4}$/

const imgChk = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/

const checkForm = (type,val) => {
    

    switch (type) {

        case 'login' :
            break

        case 'step0' :
            
            if(nameChk.test(val.name) == false || val.name == null || val.name == '')  
                return "이름은 한글과 영문만 허용하며 2자이상 15자이하로 입력 부탁드립니다"

            if(idChk.test(val.userId) == false || val.userId == null || val.userId == '') 
                return "아이디는 영문,숫자만 허용하며 4자이상 15자이하로 입력 부탁드립니다"

            if(pwdChk.test(val.password) == false || val.password == null || val.password == '') 
                return "비밀번호는 영문과 숫자,특수문자를 포함해 8자이상 30자이하로 입력 부탁드립니다"
        
            if(telChk.test(val.phone) == false || val.phone == null || val.phone == '') 
                return "하이픈을 제외한 정확한 전화번호를 입력해주세요"
        
            if(mailChk.test(val.email) == false || val.email == null || val.email == '') 
                return "정확한 이메일 형식을 입력해주세요"
        
            if(blank.test(val.userId) == true || blank.test(val.password) == true ||
               blank.test(val.name) == true || blank.test(val.phone) == true || blank.test(val.email) == true )
                return "공백이 포함되었습니다"
            
            break
        
        case 'step1' :

            if(val != null && val != '' && imgChk.test(val) == false)
                return "이미지파일만 등록 가능합니다"
            
            break

        case 'step2' :

            for(var i in val){
                if(val[i].keyId == null) return "키워드를 모두 선택해주세요"
            }

            break

        case 'step3' :
            
            for(var j in val){
                if(val[j] != null && val[j] != '' && imgChk.test(val[j]) == false)
                return "이미지파일만 등록 가능합니다"
            }

            break
        
        default :

            return null

    }

}

export { checkForm }
