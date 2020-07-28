<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Top Up</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field type="number" label="Amount" v-model="amount" required></v-text-field>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { readUserProfile } from "@/store/main/getters";
import { ITopUp } from "@/interfaces";
import { dispatchTopUp, dispatchGetUserProfile, dispatchGetUserWallet } from "@/store/main/actions";

@Component
export default class CreateInvestment extends Vue {
  public valid = false;
  public amount = 0;

  public async mounted() {
    // console.log(this.state);
    // await dispatchGetInvestments(this.$store);
    this.reset();
  }

  public reset() {
    this.amount = 0;
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  get user() {
    return readUserProfile(this.$store);
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedTopUp: ITopUp = {
        amount: this.amount,
        owner_id: this.user!.id,
      };

      await dispatchTopUp(this.$store, updatedTopUp);
      await dispatchGetUserWallet(this.$store)
    }
  }
}
</script>



