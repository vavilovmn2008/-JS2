Vue.component('loader', {
    template: `
      <div>
        <div v-if="isLoading">Загрузка</div>
        <div v-if="!isLoading && !isSuccessFetch">Упс, что-то не так. Уже чиним</div>
      </div>
  `,
  
    props: {
      isLoading: Boolean,
      isSuccessFetch: Boolean,
    },
  });