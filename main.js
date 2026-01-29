//HTTP request get,get/id,post,put/id, delete/id
async function LoadData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json()
        let body = document.getElementById("table-body");
        body.innerHTML = "";
        // Hiển thị tất cả bài viết, gạch ngang những bài đã xoá mềm
        for (const post of posts) {
            const deletedClass = post.isDeleted ? 'deleted-row' : '';
            body.innerHTML += `<tr class="${deletedClass}">
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger" onclick="Delete(${post.id})" ${post.isDeleted ? 'disabled' : ''}>
                        <i class="bi bi-trash"></i> Xóa
                    </button>
                </td>
            </tr>`
        }
        return false;
    } catch (error) {
        console.log(error);
    }

}//
async function Save() {
    let id = document.getElementById("id_txt").value;
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;
    
    // Nếu ID trống, tự động tạo ID mới
    if (!id || id.trim() === '') {
        // Lấy toàn bộ danh sách posts từ server
        let allPostsRes = await fetch('http://localhost:3000/posts');
        let allPosts = await allPostsRes.json();
        
        // Tìm ID có giá trị số lớn nhất
        let maxId = 0;
        for (const post of allPosts) {
            // Chuyển ID từ chuỗi sang số để so sánh
            let numericId = parseInt(post.id, 10);
            if (!isNaN(numericId) && numericId > maxId) {
                maxId = numericId;
            }
        }
        
        // Tăng 1 và chuyển ngược lại thành chuỗi
        id = String(maxId + 1);
        console.log("Tự động tạo ID mới: " + id);
    }
    
    let getItem = await fetch("http://localhost:3000/posts/" + id);
    if (getItem.ok) {
        //co item->put
        let res = await fetch('http://localhost:3000/posts/' + id,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        title: title,
                        views: views
                    }
                )
            })
        if (res.ok) {
            console.log("edit du lieu thanh cong");
        }

    } else {
        let res = await fetch('http://localhost:3000/posts',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        id: id,
                        title: title,
                        views: views
                    }
                )
            })
        if (res.ok) {
            console.log("them du lieu thanh cong");
        }
    }
    LoadData();

}
async function Delete(id) {
    // Xóa mềm: thêm isDeleted: true thay vì xóa cứng
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isDeleted: true
        })
    });
    if (res.ok) {
        console.log("xoa mem thanh cong");
    }
    LoadData();
}
LoadData();

// ==================== COMMENTS CRUD ====================

// Load tất cả comments
async function LoadComments() {
    try {
        let res = await fetch('http://localhost:3000/comments');
        let comments = await res.json();
        let body = document.getElementById("comments-table-body");
        body.innerHTML = "";
        
        // Hiển thị tất cả comments, gạch ngang những comment đã xoá mềm
        for (const comment of comments) {
            const deletedClass = comment.isDeleted ? 'deleted-row' : '';
            body.innerHTML += `<tr class="${deletedClass}">
                <td>${comment.id}</td>
                <td>${comment.text}</td>
                <td>${comment.postId}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger" onclick="DeleteComment(${comment.id})" ${comment.isDeleted ? 'disabled' : ''}>
                        <i class="bi bi-trash"></i> Xóa
                    </button>
                </td>
            </tr>`;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

// Lưu (thêm mới hoặc cập nhật) comment
async function SaveComment() {
    let id = document.getElementById("comment_id_txt").value;
    let text = document.getElementById("comment_text_txt").value;
    let postId = document.getElementById("comment_postId_txt").value;
    
    // Validation: Kiểm tra Post ID không được trống
    if (!postId || postId.trim() === '') {
        alert('❌ Vui lòng nhập Post ID!');
        return;
    }
    
    // Validation: Kiểm tra Post ID phải tồn tại
    let checkPostRes = await fetch('http://localhost:3000/posts/' + postId);
    if (!checkPostRes.ok) {
        alert('❌ Post ID "' + postId + '" không tồn tại! Vui lòng nhập ID bài viết hợp lệ.');
        return;
    }
    
    // Kiểm tra post có bị xóa mềm không
    let postData = await checkPostRes.json();
    if (postData.isDeleted) {
        alert('⚠️ Bài viết với ID "' + postId + '" đã bị xóa! Không thể thêm bình luận.');
        return;
    }
    
    // Nếu ID trống, tự động tạo ID mới
    if (!id || id.trim() === '') {
        // Lấy toàn bộ danh sách comments từ server
        let allCommentsRes = await fetch('http://localhost:3000/comments');
        let allComments = await allCommentsRes.json();
        
        // Tìm ID có giá trị số lớn nhất
        let maxId = 0;
        for (const comment of allComments) {
            // Chuyển ID từ chuỗi sang số để so sánh
            let numericId = parseInt(comment.id, 10);
            if (!isNaN(numericId) && numericId > maxId) {
                maxId = numericId;
            }
        }
        
        // Tăng 1 và chuyển ngược lại thành chuỗi
        id = String(maxId + 1);
        console.log("Tự động tạo Comment ID mới: " + id);
    }
    
    let getItem = await fetch("http://localhost:3000/comments/" + id);
    if (getItem.ok) {
        // Comment tồn tại -> PUT (cập nhật)
        let res = await fetch('http://localhost:3000/comments/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                postId: postId
            })
        });
        if (res.ok) {
            console.log("Edit comment thành công");
        }
    } else {
        // Comment không tồn tại -> POST (thêm mới)
        let res = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                text: text,
                postId: postId
            })
        });
        if (res.ok) {
            console.log("Thêm comment thành công");
        }
    }
    LoadComments();
}

// Xoá mềm comment
async function DeleteComment(id) {
    let res = await fetch('http://localhost:3000/comments/' + id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isDeleted: true
        })
    });
    if (res.ok) {
        console.log("Xoá mềm comment thành công");
    }
    LoadComments();
}

// Khởi tạo load comments khi trang được tải
LoadComments();

// ==================== SEARCH FUNCTIONS ====================

// Tìm kiếm Posts theo ID hoặc tiêu đề
async function SearchPosts() {
    let searchValue = document.getElementById("search_post_txt").value.toLowerCase().trim();
    
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let body = document.getElementById("table-body");
        body.innerHTML = "";
        
        // Lọc posts theo điều kiện tìm kiếm
        let filteredPosts = posts.filter(post => {
            if (searchValue === '') return true; // Nếu không có từ khóa, hiển thị tất cả
            
            // Tìm theo ID hoặc tiêu đề
            const matchId = post.id.toLowerCase().includes(searchValue);
            const matchTitle = post.title.toLowerCase().includes(searchValue);
            return matchId || matchTitle;
        });
        
        // Hiển thị kết quả
        if (filteredPosts.length === 0) {
            body.innerHTML = `<tr>
                <td colspan="4" class="text-center py-4 text-muted">
                    <i class="bi bi-search fs-1 d-block mb-2"></i>
                    Không tìm thấy kết quả cho "${searchValue}"
                </td>
            </tr>`;
            return;
        }
        
        for (const post of filteredPosts) {
            const deletedClass = post.isDeleted ? 'deleted-row' : '';
            body.innerHTML += `<tr class="${deletedClass}">
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger" onclick="Delete(${post.id})" ${post.isDeleted ? 'disabled' : ''}>
                        <i class="bi bi-trash"></i> Xóa
                    </button>
                </td>
            </tr>`;
        }
    } catch (error) {
        console.log(error);
    }
}

// Xóa tìm kiếm Posts
function ClearSearchPosts() {
    document.getElementById("search_post_txt").value = "";
    LoadData();
}

// Tìm kiếm Comments theo Post ID
async function SearchComments() {
    let searchValue = document.getElementById("search_comment_txt").value.toLowerCase().trim();
    
    try {
        let res = await fetch('http://localhost:3000/comments');
        let comments = await res.json();
        let body = document.getElementById("comments-table-body");
        body.innerHTML = "";
        
        // Lọc comments theo Post ID
        let filteredComments = comments.filter(comment => {
            if (searchValue === '') return true; // Nếu không có từ khóa, hiển thị tất cả
            
            // Tìm theo Post ID
            return comment.postId.toLowerCase().includes(searchValue);
        });
        
        // Hiển thị kết quả
        if (filteredComments.length === 0) {
            body.innerHTML = `<tr>
                <td colspan="4" class="text-center py-4 text-muted">
                    <i class="bi bi-search fs-1 d-block mb-2"></i>
                    Không tìm thấy comments cho Post ID "${searchValue}"
                </td>
            </tr>`;
            return;
        }
        
        for (const comment of filteredComments) {
            const deletedClass = comment.isDeleted ? 'deleted-row' : '';
            body.innerHTML += `<tr class="${deletedClass}">
                <td>${comment.id}</td>
                <td>${comment.text}</td>
                <td>${comment.postId}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger" onclick="DeleteComment(${comment.id})" ${comment.isDeleted ? 'disabled' : ''}>
                        <i class="bi bi-trash"></i> Xóa
                    </button>
                </td>
            </tr>`;
        }
    } catch (error) {
        console.log(error);
    }
}

// Xóa tìm kiếm Comments
function ClearSearchComments() {
    document.getElementById("search_comment_txt").value = "";
    LoadComments();
}
