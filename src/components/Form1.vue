<template>
  <div class="ui centered card">
    <h1 class="ui header">Subscription</h1>

    <div class="content">
      <div class="ui form">
        <!-- User info -->
        <fieldset class="ui segment fields">
          <div class="field">
            <label>Sid</label>
            <autocomplete
              :items="users"
              @change="onFullNameSelected"
            ></autocomplete>
            <div class="ui pointing red basic label" v-show="errors['sid']">
              {{ errors['sid'] }}
            </div>
          </div>

          <div class="field">
            <label>Number</label>
            <input type="number" v-model="number">
            <div class="ui pointing red basic label" v-show="errors['number']">
              {{ errors['number'] }}
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <input type="text" v-model="email">
            <div class="ui pointing red basic label" v-show="errors['email']">
              {{ errors['email'] }}
            </div>
          </div>
        </fieldset>

        <div class="ui buttons">
          <button class="ui disabled button" disabled>
            Back
          </button>
          <button class="ui primary button" @click="next()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from './Autocomplete';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    Autocomplete,
  },


  computed: {
    ...mapFields([
      'form.sid',
      'form.email',
      'form.number',
    ]),
  },

  mounted() {
    fetch('https://randomuser.me/api/?results=50&nat=au&exc=login')
      .then(res => res.json())
      .then(res => {
          this.users = res.results.map(u => `${u.name.first} ${u.name.last}`);
      })
      .catch(() => {});
  },

  methods: {
    next() {
      if (this.validateForm()) {
        this.$router.push('/form2');
      }
    },

    onFullNameSelected(name) {
      this.fullName = name;
      [this.firstName, this.lastName] = name.split(' ', 2);
    },

    // Validate form and return true if everything is ok
    validateForm() {
      this.errors = [];

      if (!this.fullName) {
        this.errors['sid'] = 'SID is required';
      }

      if (!this.firstName) {
        this.errors['number'] = 'A number is required';
      }

      if (!this.lastName) {
        this.errors['email'] = 'Email is required';
      }

      return Object.keys(this.errors).length === 0;
    },
  },
}
</script>
