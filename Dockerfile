# Sử dụng NodeJS bản LTS gọn nhẹ Alpine làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc bên trong Container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json trước để tận dụng Docker cache layer
COPY package*.json ./

# Cài đặt đầy đủ các package phụ thuộc (dependencies)
RUN npm install

# Copy toàn bộ mã nguồn dự án vào Container
COPY . .

# Khai báo Port mà Container sẽ lắng nghe khi chạy
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]
