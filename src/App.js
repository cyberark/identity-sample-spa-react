/*
* Copyright (c) 2022 CyberArk Software Ltd. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import Intro from './pages/Intro';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import LoginProtocols from './pages/LoginProtocols';
import Widget from './pages/Widget';
import UserInfo from './pages/UserInfo';
import Resource from './pages/Resource';
import RedirectResource from './pages/RedirectResource';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/loginprotocols" element={<LoginProtocols />} />
        <Route path="/widget" element={<Widget />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/Resource" element={<Resource />} />
        <Route path="/RedirectResource" element={<RedirectResource />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
