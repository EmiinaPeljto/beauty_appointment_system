import React, { useState } from "react";

const HelpForm = () => {

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact Support</h2>
        <p className="mt-2 text-lg text-gray-600">Submit your queries or issues below.</p>
      </div>
      <form  className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="full-name" className="block text-sm font-semibold text-gray-900">
              Full Name
            </label>
            <input
              id="full-name"
              name="full-name"
              type="text"
              value= "FirstName LastName"
              readOnly
              className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-900">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value="Subject"
              required
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 border"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 ">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value="Request message"
              required
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 border"
            />
          </div>
        </div>
        <div className="mt-10">
          
        <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#F178B6] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF66B2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF66B2]"
              >
                Submit
              </button>
        </div>
      </form>
    </div>
  );
};

export default HelpForm;