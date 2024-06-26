import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const Passref = useRef()
    const [form, setform] = useState({ site: "", username: "", Password: "" })
    const [pswAry, setpswAry] = useState([])


    useEffect(() => {
        let passwrds = localStorage.getItem("passwrds")

        if (passwrds) {
            setpswAry(JSON.parse(passwrds))
        }

    }, [])

    const copyText = (text) => {
        toast('🦄 Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }


    const showPsw = () => {
        Passref.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            Passref.current.type = "Password"

        }
        else {
            ref.current.src = "icons/eyecross.png"
            Passref.current.type = "text"

        }
    }

    const savePsw = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.Password.length > 3) {
            setpswAry([...pswAry, { ...form, id: uuidv4() }])
            localStorage.setItem("paswrds", JSON.stringify([...pswAry, { ...form, id: uuidv4() }]))
            console.log([...pswAry, form])
            setform({ site: "", username: "", Password: "" })
            toast('password saved succedfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast('error!! password not saved')
        }
    }

    const deletePsw = (id) => {
        console.log("deleting passwords with id", id)
        let c = confirm("do you really want to delete this password?")
        if (c) {
            setpswAry(pswAry.filter(item => item.id !== id))
            localStorage.setItem("paswrds", JSON.stringify(pswAry.filter(item => item.id !== id)))
            toast('password deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }

    }

    const editPsw = (id) => {
        console.log("editing passwords with id", id)
        setform(pswAry.filter(i => i.id === id)[0])
        setpswAry(pswAry.filter(item => item.id !== id))
    }

    const handleChng = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-3 md : mycontainer min-h-[85.7vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass<span className='text-green-500'>OP/ &gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center'>You own Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-5 items-center">
                    <input value={form.site} onChange={handleChng} placeholder='Enter website url' className='rounded-full border border-green-600 w-full p-4 py-1' type="text" name="site" id="site" />

                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handleChng} placeholder='Enter username' className='rounded-full border border-green-600 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={Passref} value={form.Password} onChange={handleChng} placeholder='Enter Password' className='rounded-full border border-green-600 w-full p-4 py-1' type="Password" name="Password" id="password" />

                            <span className="absolute right-[1px] top-[1px] cursor-pointer" onClick={showPsw}>
                                <img ref={ref} className='p-1' width={35} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePsw} className='flex justify-center gap-2 items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Add Password</button>
                </div>

                <div className="passwords">
                    <h1 className='font-bold text-2xl py-4'>Your Password</h1>
                    {pswAry.length === 0 && <div> No passwords to show </div>}
                    {pswAry.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-500  text-white'>
                            <tr>
                                <th className='py-2'>site</th>
                                <th className='py-2'>username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {pswAry.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-white text-center w-32'><div className='flex justify-center items-center'><a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}><lord-icon
                                            src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}></lord-icon>
                                        </div>
                                    </div>
                                    </td>

                                    <td className=' py-2 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}><lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.Password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.Password) }}><lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center w-32'>
                                        <span className='cursor-pointer mx-2' onClick={() => editPsw(item.id)}><lord-icon
                                            src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}></lord-icon></span>

                                        <span className='cursor-pointer mx-2' onClick={() => deletePsw(item.id)}><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}></lord-icon></span>

                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div >
        </>
    )
}

export default Manager
