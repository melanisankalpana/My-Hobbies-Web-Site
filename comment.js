var app = new Vue({
    el: '#app',
    data: {
      comments: []
    },
    created: function() {
      // Load comments from local storage on page load
      var storedComments = localStorage.getItem('comments');
      if (storedComments) {
        this.comments = JSON.parse(storedComments);
      }
    },
    components: {
      'comment-section': {
        template: `
          <div>
            <h2>Share Your Comments</h2>
            <div class="comment-input">
              <input v-model="comment" placeholder="Enter your comment...">
              <button class="submit-button" @click="addComment">Submit</button>
            </div>
            <ul>
              <li v-for="(comment, index) in comments" class="comment">
                {{ comment }}
                <button class="delete-button" @click="deleteComment(index)">Delete</button>
              </li>
            </ul>
          </div>
        `,
        data: function() {
          return {
            comment: ''
          }
        },
        props: ['comments'],
        methods: {
          addComment: function() {
            this.comments.unshift(this.comment);
            this.comment = '';
            // Save comments to local storage comment store
            localStorage.setItem('comments', JSON.stringify(this.comments));
          },
          deleteComment: function(index) {
            this.comments.splice(index, 1);
            // Save comments to local storage
            localStorage.setItem('comments', JSON.stringify(this.comments));
          }
        }
      }
    },
    
  });