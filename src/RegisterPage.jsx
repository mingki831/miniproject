// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";


// function RegisterPage(props) {
  
//     const navigate= useNavigate()
//     const dispatch = useDispatch();
  
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [Name, setName] = useState("");
//     const [NickName, setNickName] = useState("")
//     const [ConfirmPassword, setConfirmPassword] = useState("")
//     const [passwordError, setpasswordError] = useState("");
//     const [emailError, setemailError] = useState("");
//     const [nameError, setnameError] = useState("");
//     const [NickNameError, setNickNameError] = useState("")
//     const [confirmpasswordError, setconfirmpasswordError] = useState("");
  
//     //회원가입버튼 유효성검사
//     const handleValidation = (event) => {

//       let formIsValid = true;
  
//       if (!Email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
//         formIsValid = false;
//         setemailError("이메일을 정확하게 입력해 주세요");
//         return false;
//       } else {
//         setemailError("");
//         formIsValid = true;
//       }
  
//       if (!Name.match(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,12}$/)) {
//         formIsValid = false;
//         setnameError("이름을 정확하게 입력해 주세요");
//         return false;
//       } else {
//         setnameError("");
//         formIsValid = true;
//       }
//       if (!NickName.match(/^[\w]{1,12}$/)) {
//         formIsValid = false;
//         setNickNameError("별명을 정확하게 입력해 주세요");
//         return false;
//       } else {
//         setNickNameError("");
//         formIsValid = true;
//       }
//       if (!Password.match(/^[\w]{6,22}$/)) {
//         formIsValid = false;
//         setpasswordError(
//           "6글자 이상 입략해주세요"
//         );
//         return false;
//       } else {
//         setpasswordError("");
//         formIsValid = true;
//       }
  
//       if (!ConfirmPassword.match(/^[\w]{6,22}$/)) {
//         formIsValid = false;
//         setconfirmpasswordError(
//           "6글자 이상 입력해주세요"
//         );
//         return false;
//       } else {
//         setpasswordError("");
//         formIsValid = true;
//       }
  
//       return formIsValid;
//     }
    
//     const onEmailHandler=(event)=>{
//       setEmail(event.currentTarget.value)
//     };
//     const  onNameHandler=(event)=>{
//       setName(event.currentTarget.value)
//     };
//     const  onPasswordHandler=(event)=>{
//       setPassword(event.currentTarget.value)
//     };
//     const onNickNameHandler=(event)=>{
//       setNickName(event.currentTarget.value)
//     }
//     const  onConfirmPasswordHandler=(event)=>{
//       setConfirmPassword(event.currentTarget.value)
//     };

//     const onSubmitHandler=(event)=>{
//       event.preventDefault();
//       if(Password !==ConfirmPassword){
//         alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
//       }
//       //회원가입버튼 유효성검사
//       handleValidation();
      
//       let body={
//         email : Email,
//         name : Name,
//         nickname : NickName,
//         password : Password,
//         err : handleValidation()
//       };
     
  
//       // response.payload.msg
//       dispatch(registerUser(body))
//       .then(response => {
//         // console.log(response.payload.success)
//           if (response.payload.success && handleValidation()) {
//              navigate('/login')
//           } else {
//               alert(response.payload.msg)
//           }
//       })
  
//     }
  
//     return (
//     <div className='w-100 p-3'>
//     <div style ={{display : 'flex', alignItems : 'center'
//     ,width: "100%", height : '100vh'}}  className='d-flex
//     justify-content-center align-items-center'>
//       <Form style={{width : "30vh"}} onSubmit={onSubmitHandler}>
//         <Form.Group className="mb-3 " controlId="formBasicEmail">
//           <Form.Label>이메일</Form.Label>
//           <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler}  />
//                     <small id="emailHelp" className="text-danger form-text ">
//                     {emailError}
//                     </small>
//         </Form.Group>
  
//         <Form.Group className="mb-3 " controlId="formBasicName">
//           <Form.Label>이름</Form.Label>
//           <Form.Control type="name" placeholder="Name" value={Name} onChange={ onNameHandler}  />
//                     <small id="nameHelp" className="text-danger form-text ">
//                     {nameError}
//                     </small>
//         </Form.Group>
  
//         <Form.Group className="mb-3 " controlId="formBasicNickName">
//           <Form.Label>별명</Form.Label>
//           <Form.Control type="nickname" placeholder="Nickname" value={NickName} onChange={onNickNameHandler}  />
//                     <small id="nicknameHelp" className="text-danger form-text ">
//                     {NickNameError}
//                     </small>
//         </Form.Group>
  
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>비밀번호</Form.Label>
//           <Form.Control type="password" placeholder="Password"value={Password} onChange={onPasswordHandler}/>
//                   <small id="passworderror" className="text-danger form-text">
//                     {passwordError}
//                   </small>
//           </Form.Group>
  
//           <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
//           <Form.Label>비밀번호 확인</Form.Label>
//           <Form.Control type="password" placeholder="confirmPassword" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
//                   <small id="passworderror" className="text-danger form-text">
//                     {confirmpasswordError}
//                   </small>
//           </Form.Group>
          
        
//         <Button variant="primary" type="submit">
//           회원가입
//         </Button>
//       </Form>
//     </div>
//     </div>
//     )
//   }

//   export default RegisterPage;