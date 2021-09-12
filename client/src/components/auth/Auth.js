import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import authImg from 'src/assets/chat2.png';
import * as api from 'src/api';
// import { useDropzone } from 'react-dropzone';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    phoneNumber: '',
    avatar: '',
    password: '',
    confirmPassword: ''
} // TODO: replace form with formik

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(true);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // const onDrop = useCallback(acceptedFiles => {
    //     setForm({
    //         ...form, avatar: acceptedFiles.map(file => Object.assign(file, {
    //             preview: URL.createObjectURL(file)
    //         }))
    //     });
    // }, []);

    // const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //     onDrop,
    //     maxFiles: 1,
    //     accept: 'image/*'
    // });

    // const thumbs = form.avatar.map(file => (
    //     <div style={{
    //         display: 'inline-flex',
    //         borderRadius: 2,
    //         border: '1px solid #eaeaea',
    //         marginBottom: 8,
    //         marginRight: 8,
    //         width: 100,
    //         height: 100,
    //         padding: 4,
    //         boxSizing: 'border-box'
    //     }}
    //         key={file.name}
    //     >
    //         <div style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}>
    //             <img src={file.preview} style={{ display: 'block', width: 'auto', height: '100%' }} />
    //         </div>
    //     </div>
    // ));

    const switchMode = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: { token, userId, hashedPassword, fullName } } = await api.auth(isSignUp, form);

        // Store data inside cookies.
        cookies.set('token', token);
        cookies.set('userId', userId);
        cookies.set('fullName', fullName);
        cookies.set('username', form.username);

        if (isSignUp) {
            cookies.set('phoneNumber', form.phoneNumber);
            cookies.set('avatar', form.avatar);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatar">Avatar URL</label>
                                <input
                                    name="avatar"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {/* {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p style={{
                                        textAlign: "center",
                                        padding: "25px",
                                        fontSize: "14px",
                                        border: "1px dashed grey",
                                        borderRadius: '8px',
                                        margin: 0
                                    }}
                                    >{isDragActive
                                        ? "Drop the file here ..."
                                        : "Drag 'n' drop some files here, or click to select files"}
                                    </p>
                                </div>
                                <aside style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    marginTop: 16
                                }}
                                >
                                    {thumbs}
                                </aside>
                            </div>
                        )} */}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}
                            <span onClick={switchMode}>{isSignUp ? "Sign In" : "Sign Up"}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image"><img src={authImg} alt="auth" /></div>
        </div>
    );
}

export default Auth;
