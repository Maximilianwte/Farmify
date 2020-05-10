<template>
    <div class="profileView text-3xl flex-col px-4 md:px-16 lg:px-24 w-full">
        <div id="namerow" class="flex items-center text-3xl">
            <div id="Initials">
                <h6 class="text-5xl rounded-full border-4 px-5 py-3 mx-4">{{profile.Name[0] + profile.FamilyName[0]}}
                </h6>
            </div>
            <div id="name" class="text-4xl mr-4">{{profile.Name + " " + profile.FamilyName}}</div>
        </div>
        <div id="infoheader" class="mt-24 text-bg_secondary">
            <h4>Profile Information</h4>
        </div>
        <div id="info" class="mt-4 text-center text-main_secondary">
            <h5>Profile started: {{profile.Joined}}</h5>
            <p class="mt-6">Country: {{profile.Country}}</p>
        </div>
        <div id="billing" class="mb-20 mt-16 w-full flex-col">
            <div id="infoheader" class="text-bg_secondary">
                <h4>Account Credentials</h4>
            </div>
            <li>
                <ul id="Email" v-if="edit != 'email'"
                    class="w-full mt-6 flex-col justify-between">
                    <div id="email" class="mr-8 mb-4 xl:mb-0">E-mail: {{profile.Email}}
                    </div>
                    <button @click="pushEdit('email')"
                        class="bg-main_primary text-2xl hover:bg-main_secondary text-bg_primary rounded-sm px-8 py-2 mr-2">Edit</button>
                </ul>
                <ul id="editEmail" v-if="edit == 'email'"
                    class="text-2xl mt-6 flex-col justify-between">
                    <input type="email" placeholder="Email" v-model="input.email"
                        class="w-90 mr-0 mb-4 border-2 border-main_secondary text-bg_primary px-2">
                    <button @click="applyEdit('email')"
                        class="bg-main_primary hover:bg-main_secondary text-bg_primary rounded-sm px-8 py-2">Accept
                        Changes</button>
                </ul>
                <ul v-if="edit != 'password'"
                    class="mt-6 flex-col justify-between">
                    <div id="password" class="mr-8 mb-4">Password: {{passwordText}}
                    </div>
                    <button @click="pushEdit('password')"
                        class="bg-main_primary text-2xl hover:bg-main_secondary text-bg_primary rounded-sm px-4 lg:px-8 py-2 mr-2">Change
                        Password</button>
                </ul>
                <ul id="editPassword" v-if="edit == 'password'"
                    class="text-2xl mt-6 flex-col justify-between">
                    <input type="password" placeholder="Password" v-model="input.password"
                        class="w-90 mb-4 mr-0 border-2 border-main_secondary text-bg_primary px-2">
                    <button @click="applyEdit('password')"
                        class="bg-main_primary text-2xl hover:bg-main_secondary text-bg_primary rounded-sm px-4 lg:px-8 py-2 mr-2">Accept
                        Changes</button>
                </ul>
            </li>
        </div>
    </div>
</template>
<script>
    import data_functions from "../data/data_functions";
    import store from "../store";
    export default {
        props: ['profile'],
        data() {
            return {
                edit: "",
                passwordText: "Hidden",
                input: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            pushEdit(input) {
                this.edit = input;
            },
            applyEdit(input) {
                if (input == "email") {
                    if (this.input.email.length > 5 && this.input.email.includes("@") && this.input.email.includes(
                            ".")) {
                        data_functions.update_userAccess({
                            ActiveEmail: this.profile.Email,
                            NewEmail: this.input.email
                        }, "email");
                        store.commit("updateUserAccess", {
                            value: this.input.email,
                            valueID: "email"
                        })
                    }
                    this.edit = "";
                } else if (input == "password") {
                    if (this.input.password.length > 7) {
                        data_functions.update_userAccess({
                            Email: this.profile.Email,
                            Password: this.input.password
                        }, "password");
                        store.commit("updateUserAccess", {
                            value: this.input.password,
                            valueID: "password"
                        })
                        this.passwordText = "Authorization Sent"
                    }
                    this.edit = "";
                }
            }
        }
    }
</script>