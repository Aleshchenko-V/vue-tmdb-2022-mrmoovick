<template>
  <div class="container-lg sticky-top">
    <b-navbar
        variant="secondary"
        class="site-navbar d-flex justify-content-between rounded-bottom"
    >
      <router-link to="/" class="site-logo">
        <img
            src="@/assets/site-logo.png"
            alt="logo"
            width="60px"
            @click="getMovies(), clearHighlights(), clearFilters()"
        />
      </router-link>
      <div style="width: 750px">
        <search-movie/>
        <search-modal/>
      </div>
      <div class="logos d-flex">
        <a href="https://www.themoviedb.org/?language=en" target="_blank"
        ><img src="@/assets/tmdb-logo.svg" alt="tmdb-logo" width="40px;"
        /></a>
        <h2>&nbsp;|&nbsp;</h2>
        <a
            href="https://github.com/TheSecondCore/vue-internship-2022-tmdb"
            target="_blank"
        >
          <img src="@/assets/github-logo.svg" alt="github-logo" width="40px;"/>
        </a>
      </div>
    </b-navbar>
    <button v-b-toggle.sidebar-1
            style="position: absolute; left: -380px; top: 450px; border: 0; background-color: inherit;"
            v-if="$route.path === '/' && selectedSearchQuery === ''">
      <img width="96px" height="96px" src="../../assets/ftline-double-line-arrow-end.svg"/>
    </button>
    <b-sidebar id="sidebar-1" title="Filters"
               backdrop
               v-if="$route.path === '/' && selectedSearchQuery === '' "
               shadow>
      <div>
        <h5>By Genre:</h5>
        <my-tags/>
      </div>
      <div style="margin-top: 30px;">
        <h5>By Rating:</h5>
        <b-col sm="12">
          <span class="multi-range">
            <input type="range"
                   @change="changeLeftVoteRating(leftRatingValue), getFilter({
                       withGenres:selectedGenres,
                       chosenLeftRatingVote: leftRatingValue,
                       chosenRightRatingVote: rightRatingValue,
                       chosenLeftReleaseDateVote: leftYearValue,
                       chosenRightReleaseDateVote: rightYearValue,
                       selectedValue})"
                   v-model="leftRatingValue" min="0" max="10" id="lowerRating">
            <input type="range"
                   @change="changeRightVoteRating(rightRatingValue), getFilter({
                       withGenres:selectedGenres,
                       chosenLeftRatingVote: leftRatingValue,
                       chosenRightRatingVote: rightRatingValue,
                       chosenLeftReleaseDateVote: leftYearValue,
                       chosenRightReleaseDateVote: rightYearValue,
                       selectedValue})"
                   v-model="rightRatingValue" min="0" max="10" id="upperRating">
          </span>
          <p v-if="leftRatingValue === rightRatingValue">Only with {{ leftRatingValue }}</p>
          <p v-else>from {{ leftRatingValue }} to {{ rightRatingValue }}</p>
        </b-col>
      </div>
      <div style="margin-top: 70px;">
        <h5>By Year:</h5>
        <b-col sm="12">
          <span class="multi-range">
            <input type="range"
                   @change="changeLeftYearRating(leftYearValue), getFilter({
                       withGenres:selectedGenres,
                       chosenLeftRatingVote: leftRatingValue,
                       chosenRightRatingVote: rightRatingValue,
                       chosenLeftReleaseDateVote: leftYearValue,
                       chosenRightReleaseDateVote: rightYearValue,
                       selectedValue})"
                   v-model="leftYearValue" min="1895" max="2022" id="lowerYear">
            <input type="range"
                   @change="changeRightYearRating(rightYearValue), getFilter({
                       withGenres:selectedGenres,
                       chosenLeftRatingVote: leftRatingValue,
                       chosenRightRatingVote: rightRatingValue,
                       chosenLeftReleaseDateVote: leftYearValue,
                       chosenRightReleaseDateVote: rightYearValue,
                       selectedValue})"
                   v-model="rightYearValue" min="1895" max="2022" id="upperYear">
          </span>
          <p v-if="leftYearValue === rightYearValue">Only with {{ leftYearValue }}</p>
          <p v-else>from {{ leftYearValue }} to {{ rightYearValue }}</p>
        </b-col>
      </div>

      <div class="mt-5" style="width: 250px; margin: 0 auto;">
        <b-form-select v-model="selected" :options="options" @input="changeSelectValue(selected), getFilter({
                       withGenres:selectedGenres,
                       chosenLeftRatingVote: leftRatingValue,
                       chosenRightRatingVote: rightRatingValue,
                       chosenLeftReleaseDateVote: leftYearValue,
                       chosenRightReleaseDateVote: rightYearValue,
                       selectedValue})">
          <template #first>
            <b-form-select-option :value="null" disabled>Please select an sort option</b-form-select-option>
          </template>
        </b-form-select>
      </div>

    </b-sidebar>
  </div>
</template>

<script>
import SearchMovie from "./SearchMovie";
import {mapActions, mapMutations, mapState} from "vuex";
import SearchModal from "@/components/UI/SearchModal";
import MyTags from "@/components/Lists/MyTags";

export default {
  name: "PageHeader",
  data: () => ({
    leftRatingValue: '0',
    rightRatingValue: '10',
    leftYearValue: '1895',
    rightYearValue: '2022',
    selected: null,
    options: [
      {value: 'popularity.desc', text: 'Popular movies first'},
      {value: 'popularity.asc', text: 'Unpopular movies first'},
      {value: 'release_date.asc', text: 'Oldest movies first'},
      {value: 'release_date.desc', text: 'Newest movies first'},
      {value: 'revenue.asc', text: 'Low revenue movies first'},
      {value: 'revenue.desc', text: 'Rich revenue movies first'},
    ]
  }),
  components: {
    MyTags,
    SearchModal,
    SearchMovie,
  },
  methods: {
    clearHighlights() {
      this.leftRatingValue = "0";
      this.rightRatingValue = "10";
      this.leftYearValue = '1895';
      this.rightYearValue = '2022';
      this.selected = null;
      document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'))
    },
    ...mapActions(["getMovies", "getFilter"]),
    ...mapMutations(["changeLeftVoteRating", "changeRightVoteRating", "changeLeftYearRating", "changeRightYearRating", "clearFilters", 'changeSelectValue']),
  },
  computed: {
    ...mapState(['selectedSearchQuery', 'selectedGenres', 'selectedValue']),
  },
};
</script>

<style scoped lang="scss">
.container-lg {
  padding: 0px !important;
  margin: auto !important;
}

.site-navbar {
  padding-right: 30px;
}

.site-logo {
  margin-left: 10px;
}

.floating-button {
  text-decoration: none;
  display: inline-block;
  width: 110px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  margin: 10px 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
  font-weight: 600;
  color: #524f4e;
  background: white;
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
  transition: .3s;
}

.floating-button:hover {
  background: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, .4);
  color: white;
  transform: translateY(-7px);
}

.floating-button:active {
  background: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, .4);
  color: white;
  transform: translateY(0px);
}

input[type=range] {
  box-sizing: border-box;
  appearance: none;
  width: 305px;
  margin: 0;
  padding: 0 2px;
  /* Add some L/R padding to ensure box shadow of handle is shown */
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: linear-gradient(grey, grey) no-repeat center;
  /* Use a linear gradient to generate only the 2px height background */
  background-size: 100% 2px;
  pointer-events: none;

  &:active,
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    height: 28px;
    width: 28px;
    border-radius: 28px;
    background-color: #fff;
    position: relative;
    margin: 5px 0;
    /* Add some margin to ensure box shadow is shown */
    cursor: pointer;
    appearance: none;
    pointer-events: all;
    box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);

    &::before {
      content: ' ';
      display: block;
      position: absolute;
      top: 13px;
      left: 100%;
      width: 2000px;
      height: 2px;
    }
  }
}

.multi-range {
  position: relative;
  height: 50px;
  right: 150px;
  top: 15px;

  input[type=range] {
    position: absolute;

    &:nth-child(1) {
      &::-webkit-slider-thumb::before {
        background-color: red;
      }
    }

    &:nth-child(2) {
      background: none;

      &::-webkit-slider-thumb::before {
        background-color: grey;
      }
    }
  }
}
</style>
