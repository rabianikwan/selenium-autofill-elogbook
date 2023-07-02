import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
  }
  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
        <div>
          <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
            <div>
              <a href="/">
                <h3 className="text-4xl font-bold text-gray-500">
                  Pengisi automatis elogbook samarinda
                </h3>
              </a>
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
              <form action="/" method="post">
                <div>
                  <label htmlFor="name"
                      className="block text-sm font-medium text-gray-700 undefined">
                    NIP
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                        type="text"
                        name="name"
                        minLength="18"
                        maxLength="18"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="pass"
                      className="block text-sm font-medium text-gray-700 undefined">
                    Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                        type="password"
                        name="pass"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                      htmlFor="month"
                      className="block text-sm font-medium text-gray-700 undefined">
                    Bulan
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                        type="number"
                        name="month"
                        min="1"
                        max="12"
                        placeholder="6"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                      htmlFor="shift"
                      className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Jadwal Dinas
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                        type="text"
                        name="shift"
                        placeholder="Contoh : 'pslmmpslmm...'"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <p className="text-sm text-gray-600 underline hover:text-gray-900">
                    Sudah yakin?
                  </p> <button type="submit"
                               formMethod="post"
                               formAction="/"
                               className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md active:bg-gray-900 false">
                    Inject
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default App;

