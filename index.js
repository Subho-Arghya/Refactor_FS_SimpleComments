
class Comment {
    constructor(user, comment) {
        this.user = user;
        this.comment = comment;
        this.like = 0;
        this.dislike = 0
    }
}

class CommentImplementation {
    collection = []
    key = "allcomments"

    constructor() {
        this.collection = JSON.parse(localStorage.getItem(this.key)) ?? []
        localStorage.setItem(this.key , JSON.stringify(this.collection))
    }

    Add(model) {
        let newId = this.MaxId() + 1
        model.id = newId;
        this.collection.push(model)
        localStorage.setItem(this.key , JSON.stringify(this.collection))
    }

    Like(id) {
        let modifiedComment = this.collection.find(x => x.id == id)
        modifiedComment.like ++
        localStorage.setItem(this.key , JSON.stringify(this.collection))
    }

    Dislike(id) {
        let modifiedComment = this.collection.find(x => x.id == id)
        modifiedComment.dislike ++
        localStorage.setItem(this.key , JSON.stringify(this.collection))
    }

    DeleteComment(id) {
        let newCollection = this.collection.filter(x => x.id != id)
        localStorage.setItem(this.key, JSON.stringify(newCollection))
    }

    MaxId() {
        if(!this.collection.length) return 0
        let maxId = this.collection.reduce((acc,current)=>acc>current.id?acc:current.id,0)
        return maxId;
    }
}


const submitBtn = document.getElementById("submit")

if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let user = document.getElementById("username")
        let comment = document.getElementById("userComment") 
        let newComment = new Comment(user.value , comment.value)
        let implement = new CommentImplementation()
        implement.Add(newComment)
        console.log(newComment)
        user.value = ""
        comment.value = ""
        Display()
    })
}


function Display() {
    let data = JSON.parse(localStorage.getItem("allcomments"))
    let commentslist = []

    if (data) {
        commentslist = data
    }

    let output = document.getElementById("comment-area-container")

    output.innerHTML = ""

    if (commentslist.length > 0) {
        commentslist.forEach(comment => {
            output.innerHTML += `
            <div class="comment-card">
            <h3 class="comment-user-name">${comment.user}</h3>
            <p class="comment-body">
              ${comment.comment}
            </p>
            <div class="comment-footer">
              <div>${comment.like} Likes <button class="btn btn-like" onclick="Like(${comment.id})"><i class="fa-solid fa-thumbs-up"></i></button></div>
              <div>${comment.dislike} Dislikes <button class="btn btn-dislike" onclick="Dislike(${comment.id})"><i class="fa-solid fa-thumbs-down"></i></button></div>
              <button class="btn btn-delete delete" onclick="deleteComment(${comment.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
            `
        });
    }

    else {
        output.innerHTML = `<h3 style="text-align: center"> Nothing to display yet. Add a comment from the form above</h3>`
    }
}

Display()

function Like(id) {
    let implement = new CommentImplementation()
    implement.Like(id)
    Display()
}

function Dislike(id) {
    let implement = new CommentImplementation()
    implement.Dislike(id)
    Display()
}

function deleteComment(id) {
    let implement = new CommentImplementation()
    implement.DeleteComment(id)
    Display()
}