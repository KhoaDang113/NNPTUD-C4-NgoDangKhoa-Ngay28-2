# 📚 Bootstrap Frontend Coding Rules

## 1. Cấu trúc HTML cơ bản

### ✅ Template khởi đầu bắt buộc
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiêu đề trang</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS (sau Bootstrap) -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Nội dung -->
    
    <!-- Bootstrap JS (cuối body) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="main.js"></script>
</body>
</html>
```

---

## 2. Container & Layout

### ✅ Luôn sử dụng Container
```html
<!-- Container cố định -->
<div class="container">...</div>

<!-- Container full width -->
<div class="container-fluid">...</div>

<!-- Container responsive -->
<div class="container-lg">...</div>
```

### ✅ Grid System (12 cột)
```html
<div class="row">
    <div class="col-12 col-md-6 col-lg-4">Cột 1</div>
    <div class="col-12 col-md-6 col-lg-4">Cột 2</div>
    <div class="col-12 col-md-12 col-lg-4">Cột 3</div>
</div>
```

### ❌ KHÔNG làm
```html
<!-- Sai: col nằm ngoài row -->
<div class="col-6">Nội dung</div>

<!-- Sai: Tổng cột > 12 -->
<div class="row">
    <div class="col-8">...</div>
    <div class="col-6">...</div>
</div>
```

---

## 3. Responsive Breakpoints

| Breakpoint | Class infix | Kích thước |
|------------|-------------|------------|
| Extra small | (none) | < 576px |
| Small | `sm` | ≥ 576px |
| Medium | `md` | ≥ 768px |
| Large | `lg` | ≥ 992px |
| Extra large | `xl` | ≥ 1200px |
| XXL | `xxl` | ≥ 1400px |

### ✅ Mobile-first approach
```html
<!-- Luôn thiết kế từ mobile lên desktop -->
<div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <!-- 12 cột trên mobile, 6 trên sm, 4 trên md, 3 trên lg -->
</div>
```

---

## 4. Typography & Spacing

### ✅ Margin & Padding
```html
<!-- Format: {property}{sides}-{size} -->
<!-- property: m (margin), p (padding) -->
<!-- sides: t, b, s, e, x, y, blank -->
<!-- size: 0, 1, 2, 3, 4, 5, auto -->

<div class="mt-3 mb-4 px-2">Margin top 3, margin bottom 4, padding x 2</div>
<div class="py-5">Padding y = 5</div>
<div class="mx-auto">Căn giữa horizontal</div>
```

### ✅ Text utilities
```html
<p class="text-primary">Màu primary</p>
<p class="text-center">Căn giữa</p>
<p class="fw-bold">Chữ đậm</p>
<p class="fs-4">Font size 4</p>
<p class="text-uppercase">CHỮ HOA</p>
```

---

## 5. Components

### ✅ Buttons
```html
<!-- Đúng: sử dụng class btn + variant -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>
<button class="btn btn-lg btn-success">Large Success</button>

<!-- Đúng: link trông như button -->
<a href="#" class="btn btn-danger">Link Button</a>
```

### ✅ Cards
```html
<div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Tiêu đề</h5>
        <p class="card-text">Nội dung</p>
        <a href="#" class="btn btn-primary">Action</a>
    </div>
</div>
```

### ✅ Forms
```html
<form>
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
    </div>
    <div class="mb-3">
        <label for="select" class="form-label">Chọn</label>
        <select class="form-select" id="select">
            <option selected>Chọn một...</option>
            <option value="1">Option 1</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### ✅ Tables
```html
<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>ID</th>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>John</td>
        </tr>
    </tbody>
</table>
```

---

## 6. Flexbox & Display

### ✅ Flexbox utilities
```html
<div class="d-flex justify-content-between align-items-center">
    <span>Left</span>
    <span>Right</span>
</div>

<div class="d-flex flex-column gap-3">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
```

### ✅ Display utilities
```html
<!-- Ẩn trên mobile, hiện trên md+ -->
<div class="d-none d-md-block">Desktop only</div>

<!-- Hiện trên mobile, ẩn trên md+ -->
<div class="d-block d-md-none">Mobile only</div>
```

---

## 7. Best Practices

### ✅ NÊN làm
1. **Mobile-first**: Luôn thiết kế cho mobile trước
2. **Semantic HTML**: Sử dụng `<header>`, `<nav>`, `<main>`, `<footer>`
3. **Accessibility**: Thêm `aria-label`, `alt` cho images
4. **Custom CSS sau Bootstrap**: Để ghi đè styles
5. **Sử dụng utilities trước**: Tránh viết CSS custom không cần thiết

### ❌ KHÔNG NÊN làm
1. **Không sửa Bootstrap core**: Dùng custom CSS ghi đè
2. **Không inline styles**: Dùng utility classes
3. **Không skip grid system**: Luôn dùng row/col
4. **Không hardcode màu**: Dùng `text-primary`, `bg-danger`...
5. **Không bỏ qua responsive**: Test trên nhiều devices

---

## 8. Naming Conventions

### ✅ Custom classes
```css
/* BEM methodology khi viết custom CSS */
.card-product { }
.card-product__title { }
.card-product--featured { }

/* Hoặc prefix để tránh conflict */
.custom-header { }
.app-sidebar { }
```

---

## 9. Performance Tips

1. **Chỉ import cần thiết**: Sử dụng Bootstrap modular
2. **Minify CSS/JS**: Dùng file `.min.css`, `.min.js`
3. **CDN**: Sử dụng CDN để tận dụng cache
4. **Lazy loading**: Cho images và components

---

## 10. Checklist khi code

- [ ] Đã thêm meta viewport?
- [ ] Đã sử dụng container?
- [ ] Grid row/col đúng cấu trúc?
- [ ] Responsive trên tất cả breakpoints?
- [ ] Custom CSS sau Bootstrap?
- [ ] Accessibility (alt, aria)?
- [ ] Test trên mobile?
