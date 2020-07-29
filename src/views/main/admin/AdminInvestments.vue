<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>Manage Investments</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/admin/investments/create">Create Investment</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="investments">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.rate }}</td>
        <td>{{ props.item.lock_period }}</td>
        <td>
          <v-icon v-if="props.item.is_active">checkmark</v-icon>
        </td>
        <td>
          <v-icon v-if="props.item.is_superuser">checkmark</v-icon>
        </td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn
              slot="activator"
              flat
              :to="{name: 'main-admin-investments-edit', params: {id: props.item.id}}"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { IInvestment } from "@/interfaces";
import { readInvestments } from "@/store/admin/getters";
import { dispatchGetInvestments } from "@/store/admin/actions";
// import { dispatchGetUserWallet } from "@/store/main/actions";

@Component
export default class AdminInvestments extends Vue {
  public headers = [
    {
      text: "Name",
      sortable: true,
      value: "title",
      align: "left",
    },
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
    },
    {
      text: "Description",
      sortable: true,
      value: "description",
      align: "left",
    },
    {
      text: "Rate(%)",
      sortable: true,
      value: "rate",
      align: "left",
    },
    {
      text: "Lock Period(days)",
      sortable: true,
      value: "lock_period",
      align: "left",
    },
    {
      text: "Actions",
      value: "id",
    },
  ];
  get investments() {
    return readInvestments(this.$store);
  }

  public async mounted() {
    await dispatchGetInvestments(this.$store);
  }
}
</script>
