<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{appName}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  v-model="fullName"
                  prepend-icon="person"
                  name="fullName"
                  label="Full Name"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  prepend-icon="alternate_email"
                  name="email"
                  label="Email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  type="password"
                  ref="password"
                  label="Set Password"
                  data-vv-name="password"
                  prepend-icon="lock"
                  data-vv-delay="100"
                  v-validate="{required: true}"
                  v-model="password1"
                  :error-messages="errors.first('password')"
                ></v-text-field>
                <v-text-field
                  type="password"
                  label="Confirm Password"
                  data-vv-name="password_confirmation"
                  prepend-icon="lock"
                  data-vv-delay="100"
                  data-vv-as="password"
                  v-validate="{required: true, confirmed: 'password'}"
                  v-model="password2"
                  :error-messages="errors.first('password_confirmation')"
                ></v-text-field>
              </v-form>
              <div v-if="loginError">
                <v-alert
                  :value="loginError"
                  transition="fade-transition"
                  type="error"
                >Incorrect email or password</v-alert>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  @click="submit" :disabled="!valid">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  IUserProfile,
  IUserProfileUpdate,
  IUserProfileCreate,
} from '@/interfaces';
import { dispatchRegister } from '@/store/main/actions';

@Component
export default class CreateUser extends Vue {
  public valid = false;
  public fullName: string = '';
  public email: string = '';
  public isActive: boolean = true;
  public isSuperuser: boolean = false;
  public setPassword = false;
  public password1: string = '';
  public password2: string = '';

  public reset() {
    this.password1 = '';
    this.password2 = '';
    this.fullName = '';
    this.email = '';
    this.isActive = true;
    this.isSuperuser = false;
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {

    if (await this.$validator.validateAll()) {
      const updatedProfile: IUserProfileCreate = {
        email: this.email,
      };
      if (this.fullName) {
        updatedProfile.full_name = this.fullName;
      }
      if (this.email) {
        updatedProfile.email = this.email;
      }
      updatedProfile.is_active = this.isActive;
      updatedProfile.is_superuser = this.isSuperuser;
      updatedProfile.password = this.password1;
      await dispatchRegister(this.$store, updatedProfile);
    }
  }
}
</script>
