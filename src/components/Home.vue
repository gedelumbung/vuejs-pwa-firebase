<template>
  <div>
    <div class="mdl-grid">
      <div v-for="(people, id) in getPeoples()" class="mdl-cell mdl-cell--3-col mdl-cell--12-col-phone image-card">
        <div>
          <div class="image-card__picture">
            <img :src="people.url" />
          </div>
          <div class="image-card__comment mdl-card__actions">
            <div>{{ people.title }}</div>
            <span>{{ people.info }}</span>
          </div>
        </div>
      </div>
    </div>
    <router-link class="add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" to="/post">
      <i class="material-icons">add</i>
    </router-link>
  </div>
</template>

<style scoped>
  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 62px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > div {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 12px;
  }
</style>
<script>
  import { reduce } from 'lodash'
  export default {
    methods: {
      getPeoples () {
        if (navigator.onLine) {
          this.saveToCache()
          return reduce(this.$root.peoples, (people, firebaseEntry) => {
            people[firebaseEntry['.key']] = {
              url: firebaseEntry['url'],
              title: firebaseEntry['title'],
              info: firebaseEntry['info'],
              created_at: firebaseEntry['created_at']
            }
            return people
          }, {})
        } else {
          return JSON.parse(localStorage.getItem('peoples'))
        }
      },
      saveToCache () {
        this.$root.$firebaseRefs.peoples.orderByChild('created_at').once('value', (snapchot) => {
          let cache = {}
          snapchot.forEach((people) => {
            cache[people.key] = people.val()
          })
          localStorage.setItem('peoples', JSON.stringify(cache))
        })
      }
    },
    mounted () {
      this.saveToCache()
    }
  }
</script>