"use client"

import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, CheckIcon, XIcon, UploadIcon } from 'lucide-react';
import axios from 'axios';

const mockChildData = {
  name: "Alex",
  age: 12,
  preferences: ["Science", "Visual Learning", "Intermediate"],
  earnedPoints: 1500
};



export default function ParentDashboard() {
    
  const [childData, setChildData] = useState(mockChildData);
  const [giftList, setGiftList] = useState([]);
  const [newPreference, setNewPreference] = useState('');
  const [newGift, setNewGift] = useState({ title: '', points: 0, image: null });

  useEffect(()=>{
    async function fetch(){
    try{
        const giftChosenList= await axios.get("/api/home/selectedgifts")
        setGiftList(giftChosenList.data)
    }
    catch(e){
        console.log(e)
    }
  } 
  
    fetch();
}
  , []);

  const handleAddPreference = (e) => {
    e.preventDefault();
    if (newPreference && !childData.preferences.includes(newPreference)) {
      setChildData(prev => ({
        ...prev,
        preferences: [...prev.preferences, newPreference]
      }));
      setNewPreference('');
    }
  };

  const handleRemovePreference = (pref) => {
    setChildData(prev => ({
      ...prev,
      preferences: prev.preferences.filter(p => p !== pref)
    }));
  };

  const handleAddGift = (e) => {
    e.preventDefault();
    if (newGift.title && newGift.points && newGift.image) {
      setGiftList(prev => [...prev, { ...newGift, id: Date.now(), status: "available" }]);
      setNewGift({ title: '', points: 0, image: null });
    }
  };

  const handleRemoveGift = (id) => {
    setGiftList(prev => prev.filter(gift => gift.id !== id));
  };

  const handleChangeGiftStatus = (id, newStatus) => {
    setGiftList(prev => prev.map(gift => 
      gift.id === id ? { ...gift, status: newStatus } : gift
    ));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGift(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

   

  const GiftCard = ({ gift, actions }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={gift.url || "/placeholder.svg"} alt={gift.name} className="w-16 h-16 object-cover rounded-md" />
        <div>
          <h3 className="font-semibold text-gray-800">{gift.name}</h3>
          <p className="text-gray-600">{gift.points} points</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {actions}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Parent Dashboard</h1>

      {/* Child Preferences Section */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Child Preferences</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {childData.preferences.map((pref, index) => (
            <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
              <span>{pref}</span>
              <button onClick={() => handleRemovePreference(pref)} className="ml-2 text-blue-600 hover:text-blue-800">
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddPreference} className="flex gap-2">
          <input
            type="text"
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
            placeholder="Add a preference"
            className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Add
          </button>
        </form>
      </section>

      {/* Points Section */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Earned Points</h2>
        <p className="text-3xl font-bold text-blue-600">{childData.earnedPoints} points</p>
      </section>

      {/* Gift List Modification Section */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Gift</h2>
        <form onSubmit={handleAddGift} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Gift Title"
              value={newGift.name}
              onChange={(e) => setNewGift(prev => ({ ...prev, name: e.target.value }))}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Points"
              value={newGift.points}
              onChange={(e) => setNewGift(prev => ({ ...prev, points: parseInt(e.target.value) }))}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex-1 flex items-center justify-center p-4 border-2 border-dashed rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              {newGift.url ? (
                <img src={newGift.url || "/placeholder.svg"} alt="Gift preview" className="max-h-32 object-contain" />
              ) : (
                <div className="text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">Upload gift image</p>
                </div>
              )}
            </label>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Gift
            </button>
          </div>
        </form>
      </section>

      {/* Available Gifts Section */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Gifts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {giftList.map(gift => (
            <GiftCard
              key={gift.id}
              gift={gift}
              actions={
                <>
                  <button
                    onClick={() => handleChangeGiftStatus(gift.id, "confirmed")}
                    className="text-green-500 hover:text-green-700 transition-colors"
                    title="Confirm Gift"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleRemoveGift(gift.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Remove Gift"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </>
              }
            />
          ))}
        </div>
      </section>

      {/* Confirmed Gifts Section */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Confirmed Gifts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {giftList.map(gift => (
            <GiftCard
              key={gift.id}
              gift={gift}
              actions={
                <button
                  onClick={() => handleChangeGiftStatus(gift.id, "available")}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="Unconfirm Gift"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              }
            />
          ))}
        </div>
      </section>

      {/* Requested Gifts Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Requested Gifts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {giftList.map(gift => (
            <GiftCard
              key={gift.id}
              gift={gift}
              actions={
                <>
                  <button
                    onClick={() => handleChangeGiftStatus(gift.id, "confirmed")}
                    className="text-green-500 hover:text-green-700 transition-colors"
                    title="Confirm Gift"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleChangeGiftStatus(gift.id, "available")}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Reject Request"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </>
              }
            />
          ))}
        </div>
      </section>
    </div>

  );
  
}

