<template>
  <div>
    Clicked: {{ $store.state.count }} times
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
    {{recentHistory}}
  </div>
</template>

<script>
import { mapState,mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters([
    'recentHistory'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>