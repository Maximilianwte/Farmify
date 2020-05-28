<template>
    <div class="profileView text-3xl flex-col w-full">
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
        <div id="billing" class="mt-16 w-full flex-col">
            <div id="infoheader" class="text-bg_secondary">
                <h4>Account Credentials</h4>
            </div>
            <li>
                <ul id="Email" v-if="edit != 'email'" class="w-full mt-6 flex-col justify-between">
                    <div id="email" class="mr-8 mb-4 xl:mb-0">E-mail: {{profile.Email}}
                    </div>
                    <button @click="pushEdit('email')"
                        class="bg-main_primary text-2xl hover:bg-main_secondary text-bg_primary rounded-sm px-8 py-2 mr-2">Edit</button>
                </ul>
                <ul id="editEmail" v-if="edit == 'email'" class="text-2xl mt-6 flex-col justify-between">
                    <input type="email" placeholder="Email" v-model="input.email"
                        class="w-90 mr-0 mb-4 border-2 border-main_secondary text-bg_primary px-2">
                    <button @click="applyEdit('email')"
                        class="bg-main_primary hover:bg-main_secondary text-bg_primary rounded-sm px-8 py-2">Accept
                        Changes</button>
                </ul>
                <ul v-if="edit != 'password'" class="mt-6 flex-col justify-between">
                    <div id="password" class="mr-8 mb-4">Password: {{passwordText}}
                    </div>
                    <button @click="pushEdit('password')"
                        class="bg-main_primary text-2xl hover:bg-main_secondary text-bg_primary rounded-sm px-4 lg:px-8 py-2 mr-2">Change
                        Password</button>
                </ul>
                <ul id="editPassword" v-if="edit == 'password'" class="text-2xl mt-6 flex-col justify-between">
                    <input type="password" placeholder="Password" v-model="input.password"
                        class="w-90 mb-4 mr-0 border-2 border-main_secondary text-bg_primary px-2">
                    <button @click="applyEdit('password')"
                        class="bg-main_primary text-2xl hover:bg-main_secondary text-bg_primary rounded-sm px-4 lg:px-8 py-2 mr-2">Accept
                        Changes</button>
                </ul>
            </li>
        </div>
        <div id="yourGroup">
            <div id="groupheader" class="text-bg_secondary mb-20 mt-16 w-full flex-col">
                <h4>Your Group</h4>
                <li id="members" class="flex justify-between mt-6">
                    <ul id="me" class="text-2xl rounded-full border-4 px-4 py-3 mx-4">
                        Me
                    </ul>
                    <ul @click="showAddUser = true"
                        class="text-2xl rounded-full border-4 px-6 py-3 mx-4 cursor-pointer hover:bg-main_primary hover:text-bg_primary hover:border-main_primary">
                        +
                    </ul>
                    <ul class="text-2xl rounded-full border-4 px-6 py-3 mx-4">
                        +
                    </ul>
                    <ul class="text-2xl rounded-full border-4 px-6 py-3 mx-4">
                        +
                    </ul>
                    <ul class="text-2xl rounded-full border-4 px-6 py-3 mx-4">
                        +
                    </ul>
                </li>
            </div>
        </div>
        <div v-if="showAddUser" id="groupAdd"
            class="fixed flex-col text-2xl top-0 mt-64 bg-bg_primary text-main_primary border-4 border-main_primary rounded-sm px-12 py-8">
            <div class="row flex">
                <h5>Add user to your group:</h5>
                <input type="text" placeholder="User Email" v-model="input.userEmail"
                    class="w-90 mr-0 mb-4 border-2 ml-4 border-main_secondary text-main_primary px-2">
            </div>
            <button @click="showAddUser = false"
                class="bg-main_focus text-2xl hover:bg-main_focus_active text-bg_primary rounded-sm px-4 lg:px-8 py-2 mr-2">Add to my group</button>
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
                showAddUser: false,
                input: {
                    email: "",
                    password: "",
                    userEmail: ""
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
                            Password: this.profile.password,
                            NewEmail: this.input.email
                        }, "email");
                        var data = {
                            Email: this.input.email
                        }
                        store.commit("updateProfile", data)
                    }
                    this.edit = "";
                } else if (input == "password") {
                    if (this.input.password.length > 7) {
                        data_functions.update_userAccess({
                            Email: this.profile.Email,
                            ActivePassword: this.profile.Password,
                            NewPassword: this.input.password
                        }, "password").then(response => {
                            this.passwordText = response.data;
                        });
                        var data = {
                            Password: this.input.password
                        }
                        store.commit("updateProfile", data)
                    }
                    this.edit = "";
                }
            }
        }
    }
</script>