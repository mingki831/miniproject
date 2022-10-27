// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// function LoginPage(props) {

//     const navigate= useNavigate();
//     const dispatch = useDispatch();
    
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     //에러메세지 설정
//     const [passwordError, setpasswordError] = useState("");
//     const [emailError, setemailError] = useState("");
    
//     //로그인버튼 유효성검사
//     const handleValidation = (event) => {

//         let formIsValid = true;
        
//         //이메일 입력 오류
//         if (!Email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
//             formIsValid = false;
//             setemailError("이메일을 입력해 주세요.");
//             return false;
//         } else {
//             formIsValid = true;
//             setemailError("");
//         }
        
//         //비밀번호 입력 오류
//         if (!Password.match(/^[\w]{6,22}$/)) {
//             formIsValid = false;
//             setpasswordError("6글자 이상 입력 해주세요.");
//             return false;
//         } else {
//             setpasswordError("");
//             formIsValid = true;
//         } 

//         return formIsValid;
//     }
    
//     //입력된 email
//     const onEmailHandler=(event)=>{
//     setEmail(event.currentTarget.value)
//     };

//     //입력된 pw
//     const onPasswordHandler=(event)=>{
//     setPassword(event.currentTarget.value)
//     };
    
//     const onSubmitHandler=(event)=>{

//         event.preventDefault();
//         //로그인버튼 유효성검사
//         handleValidation();
        
//         //email, pw 정보 담음
//         let body={
//             email : Email,
//             password : Password
//         };
        
//         // response.payload.msg
//         dispatch(loginUser(body)).then(response =>{

//             console.log(response);

//             if (response.payload.success) {
//                 navigate('/')
//             } else {
//                 alert(response.payload.msg)
//             }
//         })
//     }
    
//     return (
//     <div className='w-100 p-3'>

//         <div style ={{display : 'flex', alignItems : 'center',width: "100%", height : '100vh'}}
//         className='d-flex justify-content-center align-items-center'>

//         <Form style={{width : "30vh"}} onSubmit={onSubmitHandler}>

//             <Form.Group className="mb-3 " controlId="formBasicEmail">
//                 <Form.Label>이메일</Form.Label>
//                 <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler} />
//                     <small id="emailHelp" className="text-danger form-text ">
//                         {emailError}
//                     </small>
//             </Form.Group>
            
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//                 <Form.Label>비밀번호</Form.Label>
//                 <Form.Control type="password" placeholder="Password"value={Password} onChange={onPasswordHandler}/>
//                     <small id="passworderror" className="text-danger form-text">
//                         {passwordError}
//                     </small>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                 <Form.Check type="checkbox" label="로그인 유지" />
//             </Form.Group>

//             <Button variant="primary" type="submit" onSubmit={onSubmitHandler}>
//                 로그인
//             </Button>

//         </Form>

//         </div>
//     </div>
//     )
//     }

//     export default LoginPage;