<template>
</template>

<script>
export default {
  methods: {
    cutWord: function(input, words){
        for(let i in words) {
            if (input.indexOf(words[i]) !== -1) {
              return [true, input.replace(words[i] ,"")]
            }
        }
        return [false, null]
    },
    findWord: function(input, words){
        for(let i in words) {
            if (input.indexOf(words[i]) !== -1) {
              return true
            }
        }
        return false
    },
  }
}
</script>
