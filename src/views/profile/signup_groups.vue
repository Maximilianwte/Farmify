<template>
    <div id="groups" class="flex-col text-center">
        <div id="info" class="w-3/4 md:w-1/2 text-xl mt-16 text-justify">
            <p>If you received an activation code from one of your travelmates, you can input it here. Otherwise please
                choose one of the options below.</p>
        </div>
        <input type="text" placeholder="Group Activation Code" v-model="input.activationCode"
            class="mt-8 text-2xl w-90 border-2 border-main_secondary text-dark px-2 py-2">
        <button v-if="input.activationCode != '' && input.activation == false" @click="checkRedeem()"
            class="button text-2xl mb-16 mt-4 bg-main_focus hover:bg-main_focus_active text-light py-2 px-8 lg:px-8 rounded-sm mx-2 cursor-pointer">Apply</button>
        <div v-if="input.activation == false" class="container">
            <h3 class="mt-8 text-3xl">Farmify for Groups</h3>
            <h6 class="text-bg_secondary text-xl">All your travelmates connected.</h6>
            <div class="groups mt-8 mb-8 flex-col md:flex-row justify-center cursor-pointer text-xl">
                <div @click="setActiveGroup(1)"
                    :class="{'bg-main_primary': activegroup == 1, 'bg-bg_secondary': activegroup != 1}"
                    class="single text-bg_primary rounded-tl-sm rounded-tr-sm md:rounded-tr-none md:rounded-bl-sm w-full md:w-64 flex-col px-12 md:h-90">
                    <h4 class="text-3xl mt-8">Single Person</h4>
                    <div class="icon mt-4">
                        <svg class="svg-xl svg-light svg-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M488 328h-1.6a79.5 79.5 0 00-2.5-9.3l1.4-.8a8 8 0 003-11s-7.5-13.6-9.4-15.6a7.9 7.9 0 00-9.6-1.2l-1.4.9a80 80 0 00-6.9-6.9 25.7 25.7 0 001.8-4 8 8 0 00-3.9-8.3l-13.8-8a8 8 0 00-11 3l-.8 1.3a79.5 79.5 0 00-9.3-2.5V264a8 8 0 00-8-8h-12.6l-19.5-27.8 34.6-12.6a8 8 0 00-1.2-15.5l-48-8a8 8 0 00-3.5.2l-6 1.7-36.2-49.6a40.3 40.3 0 00-27.7-16.1c-5.9-5.9-16.4-9.5-22.7-8-8 1.2-53.4 14.3-53.4 14.3L207 112.3l9.7-5.8 20 9.9a8 8 0 0010.8-3.7l7.4-15.5 12-18 5.8 2.6a8 8 0 009.2-2S295.1 65 295.5 64a8 8 0 00-2.4-9l-31.8-26.5a53.9 53.9 0 00-85.6 24.3l-4.4 13.3c-17.8 1.9-35.1 4.7-53.3 18.7A88.9 88.9 0 0085.2 136l-1.4 8.7 15.8 2.6 1.4-8.7a63.9 63.9 0 0140.6-49.3 24.3 24.3 0 002.6 11.5v.1l14.7 28-3.5 1.5a32 32 0 00-19.4 29.4v20l-44.8-19.2a8 8 0 00-11 6l-3 17.8a48 48 0 0027.4 51.6l46.7 21.2-84 6 1-2.8a8 8 0 016.8-5.5l26.8-2.6-1.6-16-26.8 2.7a24 24 0 00-20.4 16.3l-3.3 10-27.7 7a8 8 0 00-6 9.4 8.2 8.2 0 007.3 6.3l69.8 7.7 49.3 33-1.4-1a8 8 0 00-11 3l-.8 1.4a79.5 79.5 0 00-9.3-2.5V328a8 8 0 00-8-8H96a8 8 0 00-8 8v1.6a79.5 79.5 0 00-9.3 2.5l-.8-1.4a8 8 0 00-11-3S51.4 337 50.7 338a8 8 0 00-.6 8.8l.9 1.4A80 80 0 0044 355a25.7 25.7 0 00-4-1.8 8 8 0 00-8.3 3.9l-8 13.8a8 8 0 003 11l1.3.8a79.5 79.5 0 00-2.5 9.3H24a8 8 0 00-8 8v16a8 8 0 008 8h1.6a79.5 79.5 0 002.5 9.3l-1.4.8a8 8 0 00-3 11s8.8 15 9.3 15.4a8 8 0 009.7 1.3l1.4-.8A80 80 0 0051 468l-.8 1.3a8 8 0 002.9 11l13.8 8a8 8 0 0011-3l.8-1.3a79.5 79.5 0 009.3 2.5v1.6a8 8 0 008 8h16a8 8 0 008-8v-1.6a79.5 79.5 0 009.3-2.5l.8 1.4a8 8 0 0011 3s15.5-9.3 16.2-10.2a8 8 0 00.5-8.8l-.8-1.4a80 80 0 006.9-6.9l1.3.8a8 8 0 0011-2.9l8-13.8a8 8 0 00-3-11l-1.3-.8a79.5 79.5 0 002.5-9.3h1.6a8 8 0 008-8v-16a8 8 0 00-8-8h-1.6l-1.2-5 5-3H264a8 8 0 005.7-2.3l24-24a8 8 0 002.3-5.7v-76l22-16.6 22.4 30a8 8 0 00-4.6 3.7l-8 13.8a8 8 0 003 11l1.3.8a79.5 79.5 0 00-2.5 9.3H328a8 8 0 00-8 8v16a8 8 0 008 8h1.6a79.5 79.5 0 002.5 9.3l-1.4.8a8 8 0 00-3 11s8.8 15 9.3 15.4a8 8 0 009.7 1.4l1.4-.9a80 80 0 006.9 6.9l-.8 1.3a8 8 0 002.9 11l13.8 8a8 8 0 0011-3l.8-1.3a79.5 79.5 0 009.3 2.5v1.6a8 8 0 008 8h16a8 8 0 008-8v-1.6a79.5 79.5 0 009.3-2.5l.8 1.4a8 8 0 0011 3s12.9-7 16.2-10.2c2.4-2.3 2.1-6.1.6-8.8l-.9-1.4a80 80 0 006.9-6.9l1.3.8a8 8 0 0011-2.9l8-13.8a8 8 0 00-3-11l-1.3-.8a79.5 79.5 0 002.5-9.3h1.6a8 8 0 008-8v-16a8 8 0 00-8-8zm-111.4 10.2l18 24.2a8 8 0 0011 1.7l23-16.6a8 8 0 001.9-11.2l-17.5-24a32 32 0 11-36.4 25.9zm36.2 1l-10.1 7.4-47.7-64.3 10.9-7.3zm-44-104.6l10.8 15.4-7.9 6v-.2l-12.5-17zm-12.4 27.5l-11 7.3L314 227l11.3-7.5zm26.3 6l-.2-.2 6.3-4.8 2 2.8a80 80 0 00-6.4 1.7l-1.7.5zm-14.2-60l15.4 2.7-34.4 14.7-7.2-9.8zm-57.8-54.3l27.9 38.2-8.9 6.4-28.3-38.7a30 30 0 002.6-12 24 24 0 016.7 6.1zm-92.5-2.1l53.5-15.3 4.3-.4a12 12 0 0112 12.7A12.2 12.2 0 01276 160a12 12 0 01-11-7 8 8 0 00-10.3-4.2l-32 12.7a28.5 28.5 0 01-36-13.8l-7.6-14.5 16.2-9L209 148a8 8 0 009.1 3.7zm10-88.8l23.7 10-5.9 8.8-20.2-14.4a2.5 2.5 0 01-.8-3.3 2.5 2.5 0 013.2-1.1zm-37.3-5A37.9 37.9 0 01251 40.8L276.5 62l-2.6 2.8-6.7-3h-.2l-31.3-12.6A18.2 18.2 0 00218 80.7L238 95.6l-1.5 2.8-50.6-25.3zM173 85.1l14.4 25.2-15.6 8.7L158 93.3a8.5 8.5 0 013.7-11.6 8.5 8.5 0 0111.2 3.4zM93 187l1.2-7.7 46.4 19.9 50.6 25.2a16 16 0 018.8 14.3V272h-24v-16a8 8 0 00-4.7-7.3l-60-27.3A32 32 0 0192.9 187zM232 344a16 16 0 1116-16 16 16 0 01-16 16zm16-43.7a31.9 31.9 0 00-32 0V280h32zm-141.6 113l-7-10.8 60.6-36.4v9.9a8 8 0 001.3 4.3zM97 280l-16.2-1.7 79.3-5.7V321l-59.6-39.8A8 8 0 0097 280zm63.1 60.3v7.2l-2.2 1.3-.8-.7.9-1.4a8 8 0 00.8-6 7.9 7.9 0 00-.7-1.8zm7.6 60.6a8 8 0 008 7.1 8 8 0 00-8 7.1 63.5 63.5 0 01-5 18.5 8 8 0 003.3 10.2 8 8 0 00-10.4 2.2 64 64 0 01-13.5 13.5 8 8 0 00-2.2 10.4 8 8 0 00-10.2-3.3 63.5 63.5 0 01-18.5 5 8 8 0 00-7.1 8 8 8 0 00-7.1-8 63.5 63.5 0 01-18.5-5 8 8 0 00-10.2 3.3 8 8 0 00-2.2-10.4A64 64 0 0152.5 446a8 8 0 00-10.4-2.2 8 8 0 003.3-10.2 63.5 63.5 0 01-5-18.5 8 8 0 00-8-7.1 8 8 0 008-7.1 63.5 63.5 0 015-18.5 8 8 0 00-3.3-10.2 8 8 0 0010.4-2.2A64 64 0 0166 356.5a8 8 0 002.2-10.4 8 8 0 0010.2 3.3 63.5 63.5 0 0118.5-5 8 8 0 007.1-8 8 8 0 007.1 8 63.5 63.5 0 0118.5 5 8 8 0 0010.2-3.3 8 8 0 002.1 10.4l1.4 1-59.4 35.6a8 8 0 00-2.6 11.3l16 24a8 8 0 0010.8 2.5l27.2-16.4a32 32 0 11-27.7-38.3l1.8-15.9A48 48 0 10152 408l-.1-3.4 14.9-9 .8 5.3zM176 368v-80h24v56a8 8 0 003.6 6.7l20.4 13.6v3.7zm104-19.3L260.7 368H240v-8c11.8-2.8 24-16.6 24-23.7V280h16zm5.3-84.7H216v-25.2a31.8 31.8 0 00-17.7-28.6L152 187.1v-27.3a16 16 0 019.7-14.7l4.6-2 6.2 11.9a44.5 44.5 0 0056.2 21.4l26-10.3A28 28 0 00276 176h.2a27.8 27.8 0 0014.3-4l25.3 34.5-11.4 7.6-26-34.9a8 8 0 00-8-3l-48 10.2 1.8 7.5a8 8 0 009.4 6l35-7 10.5 14.1a115.6 115.6 0 00-61.8 4.4l5.3 15a99.3 99.3 0 0172.7 2.4l13.2 17.8zm186.3 87.1a63.5 63.5 0 01-5 18.5 8 8 0 003.3 10.2 8 8 0 00-10.4 2.2 64 64 0 01-13.5 13.5 8 8 0 00-2.2 10.4 8 8 0 00-10.2-3.3 63.5 63.5 0 01-18.5 5 8 8 0 00-7.1 8 8 8 0 00-7.1-8 63.5 63.5 0 01-18.5-5 8 8 0 00-10.2 3.3 8 8 0 00-2.2-10.4 64 64 0 01-13.5-13.5 8 8 0 00-10.4-2.2 8 8 0 003.3-10.2 63.5 63.5 0 01-5-18.5 8 8 0 00-8-7.1 8 8 0 008-7.1 63.5 63.5 0 015-18.5 8 8 0 00-3.3-10.2 8 8 0 008.1 0l10.8 14.4a48.1 48.1 0 1036.4-26.1L391 282.3a63.2 63.2 0 019.9-1.9 8 8 0 007.1-8 8 8 0 007.1 8 63.5 63.5 0 0118.5 5 8 8 0 0010.2-3.3 8 8 0 002.2 10.4 64 64 0 0113.5 13.5 8 8 0 0010.4 2.2 8 8 0 00-3.3 10.2 63.5 63.5 0 015 18.5 8 8 0 008 7.1 8 8 0 00-8 7.1z" />
                        </svg>
                    </div>
                    <p class="mt-8 text-lg">One Time Fee</p>
                    <h5 class=" mb-8 text-2xl">17.90 $AUD</h5>
                </div>
                <div @click="setActiveGroup(2)"
                    :class="{'bg-main_primary': activegroup == 2, 'bg-bg_secondary': activegroup != 2}"
                    class="3group text-bg_primary flex-col w-full md:w-64 md:h-90">
                    <h4 class="text-3xl mt-8">Group of 3</h4>
                    <div class="icon mt-4">
                        <svg class="svg-dark svg-light svg-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path
                                    d="M405 288.8a33.2 33.2 0 100 66.4 33.2 33.2 0 000-66.4zm0 51.3a18.2 18.2 0 110-36.3 18.2 18.2 0 010 36.3zM85.3 288.8a33.2 33.2 0 100 66.4 33.2 33.2 0 000-66.4zm0 51.3a18.2 18.2 0 110-36.3 18.2 18.2 0 010 36.3z" />
                                <path
                                    d="M0 318.2v8.1c0 9 7.4 16.4 16.4 16.4h14a58.9 58.9 0 00109.9 0h73.1a7.5 7.5 0 100-15h-69.6c.4-3.7.4-7.4 0-11h202.6c-.3 3.6-.3 7.3 0 11h-98a7.5 7.5 0 100 15H350a58.9 58.9 0 00110 0h35.6c9 0 16.4-7.3 16.4-16.4v-8.1c0-6.5-3.8-12.1-9.3-14.8v-23.2a50.3 50.3 0 00-40.3-49.4L388 215.6c-.6 0-1.2-.2-1.8-.4a20.4 20.4 0 00-19.7-15.5h-1l-23-19.8a7.5 7.5 0 10-9.8 11.4l12.7 11c-3.6 1.9-6.5 5-8.3 8.4l-34.8-30a64.8 64.8 0 00-27.6-14 334.4 334.4 0 00-179.5 7.9c-14 4.7-26 14-33.9 26.4a11.7 11.7 0 002.2 15L94.3 243c2.1 1.8 4.9 2.9 7.7 2.9h238.8c3.8 3.8 8.9 6 14.4 6h11.3c11.2 0 20.3-9.2 20.3-20.4v-.7l65.7 13.4V266c0 11.5 9.4 20.8 20.8 20.8h14.4v15h-27.5a58.8 58.8 0 00-110.4 0H140.5a58.8 58.8 0 00-110.4 0h-8l-1.7-6.6c-1.1-3.9-1.6-7.8-1.6-11.9v-5h7.5c11.2 0 20.4-9.2 20.4-20.4v-6.6c0-10.7-8.2-19.5-18.7-20.4l23.4-36.3a77.1 77.1 0 0140-31.2c78-26.4 150-16.4 186-8.1 10.5 2.4 20.3 7 29 13.6a7.5 7.5 0 109-12 90.7 90.7 0 00-34.7-16.2A362.8 362.8 0 0086.6 149a92.2 92.2 0 00-47.8 37.3l-25.5 39.5c-6.2 9.7-9.5 21-9.5 32.6v24.7c0 5.4.7 10.7 2 15.9l1.6 5.4c-4.5 3-7.4 8-7.4 13.7zm292.5-126l42.3 36.3v2.3h-96.4v-55.2c13 1.6 24.1 3.7 33 5.8 7.7 1.7 15 5.5 21.1 10.7zm-217 14.5c11.3-15.4 26.4-19.4 47.6-24.7l8.2 48.8h-28zm71 24l-8.8-51.9c45-8.8 79.1-4.8 85.7-4.7v56.7zm220 6h-11.3a5.4 5.4 0 01-5.4-5.3V220c0-3 2.4-5.4 5.4-5.4h11.3c3 0 5.3 2.4 5.3 5.4v11.3c0 3-2.4 5.4-5.3 5.4zm38.5 129a43.9 43.9 0 11.1-87.7 43.9 43.9 0 01-.1 87.7zm62.5-99.8v-17.6a35.6 35.6 0 0119.1 23.4h-13.3a5.8 5.8 0 01-5.8-5.8zm27.7 50.9h.4c.8 0 1.4.6 1.4 1.4v8.1c0 .8-.6 1.4-1.4 1.4h-32.1a59 59 0 000-11zm-410 49a43.9 43.9 0 11.2-87.8 43.9 43.9 0 01-.1 87.7zm-58.5-49c-.3 3.6-.3 7.3 0 11H16.5c-.8 0-1.4-.7-1.4-1.5v-8.1c0-.8.6-1.4 1.4-1.4h10.3zm5-65.7v6.7c0 3-2.4 5.3-5.4 5.3h-7.5c0-2.7-.7-9 1.8-17.3h5.7c3 0 5.4 2.4 5.4 5.3z" />
                                <path
                                    d="M262.6 274.2a7.5 7.5 0 100-15h-9.4a7.5 7.5 0 100 15zM168.6 274.2a7.5 7.5 0 100-15h-9.4a7.5 7.5 0 100 15z" />
                            </g>
                        </svg>

                    </div>
                    <p class="mt-8 text-lg">One Time Fee</p>
                    <h5 class="text-2xl">34.90 $AUD</h5>
                    <h5 class="mb-8 text-lg">- 11.63 $AUD per Person -</h5>
                </div>
                <div @click="setActiveGroup(3)"
                    :class="{'bg-main_primary': activegroup == 3, 'bg-bg_secondary': activegroup != 3}"
                    class="5group text-bg_primary flex-col md:rounded-tr-sm rounded-br-sm rounded-bl-sm md:rounded-bl-none w-full md:w-64 md:h-90">
                    <h4 class="text-3xl mt-8">Group of 5 </h4>
                    <div class="icon mt-4">
                        <svg class="svg-dark svg-light svg-xl" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 61v2h62v-2H17z" />
                            <path
                                d="M55 54h7c.6 0 1-.4 1-1V40v-.4l-4.6-12a7 7 0 00-6.6-4.6H49v-2h2v-2h-2.1A7 7 0 0044 7a7 7 0 00-4.9 12h-2.3l.2-1v-6a3 3 0 00-3-3h-6a3 3 0 00-2 .8 3 3 0 00-2-.8h-1.2l.2-1V4a3 3 0 00-3-3h-6a3 3 0 00-3 3v4c0 .4 0 .8.2 1.1A3 3 0 009 12v6c0 .4 0 .7.2 1H7v2h2v2H8a7 7 0 00-7 7v23c0 .6.4 1 1 1h7a8 8 0 0016 0h14a8 8 0 0016 0zm4-2v-8h2v8zM39 14a5 5 0 1110 0 5 5 0 01-10 0zm-11-3h6c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1h-6a1 1 0 01-1-1v-6c0-.6.4-1 1-1zM13 4c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1h-6a1 1 0 01-1-1zm-2 14v-6c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H12a1 1 0 01-1-1zm0 3h36v2H11zm-3 4h43.8c2.1 0 4 1.3 4.7 3.2l4.5 12V42h-3a1 1 0 00-1 1v9h-2a8 8 0 00-15-2.8V28c0-.6-.4-1-1-1H21a1 1 0 00-1 1v13H9v2h11v2.6A8 8 0 009 52H7V42c0-.6-.4-1-1-1H3V30a5 5 0 015-5zm30 12h-7v-8h7zm-9 0h-7v-8h7zm-7 2h16v9H23.2c-.3-.5-.7-.9-1.2-1.2zm2.4 11H39c.3 0 .6-.1.7-.3a8 8 0 00-.6 2.3H24.9a8 8 0 00-.5-2zM3 43h2v9H3zm14 16a6 6 0 110-12 6 6 0 010 12zm30 0a6 6 0 110-12 6 6 0 010 12z" />
                            <path
                                d="M47 49a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4zM17 49a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4zM43 39h13a1 1 0 001-1.3l-2.6-8.6a3 3 0 00-2.9-2.1H43a1 1 0 00-1 1v10c0 .6.4 1 1 1zm1-10h7.5c.5 0 .8.3 1 .7l2.2 7.3H44zM42 41h4v2h-4zM8 39h9c.6 0 1-.4 1-1V28c0-.6-.4-1-1-1H8a1 1 0 00-1 1v10c0 .6.4 1 1 1zm1-10h7v8H9zM22 13h-9v2h8v2h2v-3c0-.6-.4-1-1-1zM44 11a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>

                    </div>
                    <p class="mt-8 text-lg">One Time Fee</p>
                    <h5 class="text-2xl">44.90 $AUD</h5>
                    <h5 class="mb-8 text-lg">- 8.98 $AUD per Person -</h5>
                </div>
            </div>
        </div>
        <div id="navigate" class="flex mb-12 justify-center">
            <button
                class="text-center text-2xl mr-2 mt-4 bg-main_focus_active hover:bg-main_focus_active rounded-sm text-light py-2 px-8 w-40 rounded cursor-pointer">Previous</button>
            <button @click="getPage('next')"
                class="text-center text-2xl ml-2 mt-4 bg-main_focus hover:bg-main_focus_active rounded-sm text-light py-2 px-8 w-40 rounded cursor-pointer">Next</button>
        </div>
    </div>
</template>
<script>
    import store from "../../store";
    import cookie_functions from "../../data/cookie_functions";
    export default {
        data() {
            return {
                activegroup: 1,
                input: {
                    activationCode: "",
                    activation: false
                }
            }
        },
        mounted() {
            this.signupInit();
        },
        methods: {
            setActiveGroup(key) {
                this.activegroup = key;
            },
            signupInit() {
                if (store.state.cookies.accepted == true) {
                    var activationCode = cookie_functions.getCookie("activationCode");
                    var groupState = cookie_functions.getCookie("groupState");
                    activationCode != "" ? this.input.activationCode = activationCode : "";
                    groupState != "" ? this.activegroup = groupState : "";
                }
            },
            checkRedeem() {
                // check here from firestore database
                this.input.activation = true;
            },
            getPage(dir) {
                if (store.state.cookies.accepted == true) {
                    cookie_functions.setCookie("activationCode", this.input.activationCode, 7);
                    cookie_functions.setCookie("groupState", this.activegroup, 7);
                }
                if (dir == "next") {
                    store.commit("pushSignUpPageCode", 1);
                    this.$router.push({
                        name: 'signup',
                        params: {
                            page: 1
                        }
                    });
                } else {
                    this.$router.push({
                        name: 'signup',
                        params: {
                            page: 0
                        }
                    });
                }
            },
        }
    }
</script>