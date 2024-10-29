"use client";
import Link from 'next/link';
import "./home.css";
import { Button, Alert } from '../materialTailwind/tailwindMaterial';
import "../signin/signin.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function Home() {
  const [pereference, setPereference] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [pereferenceInput, setPereferenceInput] = useState("");
  const [hobbiesInput, setHobbiesInput] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const [show,setShow]= useState(false)
  useEffect(()=>{
    const fetchFirstTime= async ()=>{
    try{
      const response=await axios.get('/api/home/checkFirstTime')
      console.log(response.data)
      if(response.data==="filled")
          {router.push("/home/main")
            return
          }
      else if(response.data==="giftsNotFilled"){
          {router.push("home/gifts")
            return
          }
      }
      setShow(true)
  }
  catch(error){
      console.log(error)
  }
}
fetchFirstTime()
  },[])
  const addPereference = () => {
    if (pereferenceInput.trim() !== "") {
      setPereference([...pereference, pereferenceInput]);
      setPereferenceInput("");  // Clear the input field after adding the preference
    }
  };

  const addHobbies = () => {
    if (hobbiesInput.trim() !== "") {
      setHobbies([...hobbies, hobbiesInput]);
      setHobbiesInput("");  // Clear the input field after adding the hobby
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || age.trim() === "") {
      setErrorMessage("Please specify both name and age.");
      return;
    }

    let objectToSend = {
      name: name,
      age: age,
      hobbies: hobbies,
      peref: pereference
    };
    
    try {
      await axios.post('http://localhost:3000/api/home/addPerefHobbies', objectToSend);
      router.push('/home/gifts'); 
    } catch (error) {
      console.error(error);
    }
  };

  const removePereference = (index) => {
    const newPereference = pereference.filter((_, i) => i !== index);
    setPereference(newPereference);
  };

  const removeHobby = (index) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(newHobbies);
  };

  return (
    <>
    {show ?<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="card shadow">
          <h1 className='head'>Let's customize your child's experience</h1>
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                  Age
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    autoComplete="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Learning Preferences */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="pereference" className="block text-sm font-medium leading-6 text-gray-900">
                    Learning Preferences
                  </label>
                </div>
                <div className="mt-2" style={{ display: "flex" }}>
                  <input
                    id="pereference"
                    name="pereference"
                    type="text"
                    placeholder='Favorite Subjects'
                    autoComplete="pereference"
                    value={pereferenceInput}
                    onChange={(e) => setPereferenceInput(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Button
                    onClick={addPereference}
                    type="button"
                    className="flex ml-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 mt-1">
                  {pereference.map((pref, index) => (
                    <div
                      key={index}
                      className="pereference cards"
                      onClick={() => removePereference(index)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      #{pref}<span className='span'>X</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests and Hobbies */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="hobbies" className="block text-sm font-medium leading-6 text-gray-900">
                    Interests and Hobbies
                  </label>
                </div>
                <div className="mt-2" style={{ display: "flex" }}>
                  <input
                    id="hobbies"
                    name="hobbies"
                    type="text"
                    placeholder='Hobbies'
                    autoComplete="hobbies"
                    value={hobbiesInput}
                    onChange={(e) => setHobbiesInput(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Button
                    onClick={addHobbies}
                    type="button"
                    className="flex ml-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 mt-1">
                  {hobbies.map((hobby, index) => (
                    <div
                      key={index}
                      className="pereference cards"
                      onClick={() => removeHobby(index)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      #{hobby}<span className='span'>X</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div> : ""}
      
    </>
  );
}

export default Home;
