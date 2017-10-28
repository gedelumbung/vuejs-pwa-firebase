<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <div class="card-image__picture">
          <img :src="this.url"/>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="title" v-model="title" type="text" class="mdl-textfield__input"/>
          <label for="title" class="mdl-textfield__label">Give me a name...</label>
        </div>
        <div class="actions">
          <a @click.prevent="storePeople" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Save People
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>

export default {
  data () {
    return {
      'url': null,
      'title': null
    }
  },
  mounted () {
    this.$http.get('https://randomuser.me/api/').then(response => {
      this.url = response.body.results[0].picture.large
    })
  },
  methods: {
    storePeople () {
      if (this.title == null) {
        alert('Please, dont leave me without name :(')
      } else {
        this.$root.$firebaseRefs.peoples.push(
          {
            'url': this.url,
            'title': this.title,
            'info': 'Posted by OnaniMous',
            'created_at': -1 * new Date().getTime()
          })
          .then(this.$router.push('/'))
      }
    }
  }
}
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>