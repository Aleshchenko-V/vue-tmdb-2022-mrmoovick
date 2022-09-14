<template>
  <div class="tags">
    <div
      :class="isActive ? 'tag highlight' : `tag`"
      v-for="tag in genres"
      :key="tag.id"
      @click="
        myToggle($event, tag.id),
          getFilter({
            withGenres: selectedGenres,
            chosenLeftRatingVote: leftRatingRangeValue,
            chosenRightRatingVote: rightRatingRangeValue,
            chosenLeftReleaseDateVote: leftYearRangeValue,
            chosenRightReleaseDateVote: rightYearRangeValue,
            selectedValue,
          })
      "
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "myTags",
  data: () => ({
    isActive: false,
    genres: [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ],
  }),
  methods: {
    myToggle(e, id) {
      e.target.classList.toggle("highlight");
      if (this.selectedGenres.includes(id)) {
        this.selectedGenres.forEach((selectedId, idx) => {
          if (selectedId === id) {
            this.REMOVE_GENRE(idx);
          }
        });
      } else {
        this.PUSH_GENRE(id);
      }
    },
    ...mapMutations(["PUSH_GENRE", "REMOVE_GENRE"]),
    ...mapActions(["getFilter"]),
  },
  computed: {
    ...mapState([
      "selectedGenres",
      "leftRatingRangeValue",
      "rightRatingRangeValue",
      "leftYearRangeValue",
      "rightYearRangeValue",
      "selectedValue",
    ]),
  },
};
</script>

<style scoped>
.tags {
  width: 90%;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}

.tag {
  padding: 10px 20px;
  background-color: #c4e8c2;
  border-radius: 50px;
  margin: 5px;
  display: inline-block;
  cursor: pointer;
}

.tag.highlight {
  background-color: #46a094;
}
</style>
