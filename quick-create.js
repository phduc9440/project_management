// Tự động load biến môi trường từ file .env
require("dotenv").config();
const mongoose = require("mongoose");

// Import các models tương ứng trong dự án
const Product = require("./models/product.model");
const ProductCategory = require("./models/product-category.model");

const quickCreate = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            console.error("❌ Lỗi: Không tìm thấy biến MONGO_URL trong file .env!");
            process.exit(1);
        }

        console.log("⏳ Đang kết nối tới cơ sở dữ liệu MongoDB...");
        await mongoose.connect(mongoUrl);
        console.log("✅ Kết nối Database thành công!");

        console.log("⏳ Đang dọn dẹp dữ liệu cũ để tránh trùng lặp...");
        // Dọn sạch các danh mục và sản phẩm mẫu cũ
        await ProductCategory.deleteMany({});
        await Product.deleteMany({});
        console.log("✅ Đã làm sạch Database hoàn toàn!");

        // ================= GIAI ĐOẠN 1: TẠO HỆ THỐNG 10 DANH MỤC ĐA CẤP (PARENT_ID) =================
        console.log("⏳ Đang khởi tạo 13 danh mục đa cấp phong phú (3 nhóm cha lớn và 10 danh mục con)...");

        // --- NHÓM 1: THỜI TRANG NAM (Cha lớn) ---
        const catNam = await new ProductCategory({
            title: "Thời trang Nam",
            parent_id: "",
            description: "Trang phục thanh lịch, mạnh mẽ dành riêng cho phái mạnh.",
            status: "active",
            position: 1,
            deleted: false
        }).save();

        const subCatAoNam = await new ProductCategory({
            title: "Áo Nam",
            parent_id: catNam._id.toString(),
            description: "Áo sơ mi, áo thun, áo len, áo khoác nam.",
            status: "active",
            position: 1,
            deleted: false
        }).save();

        const subCatQuanNam = await new ProductCategory({
            title: "Quần Nam",
            parent_id: catNam._id.toString(),
            description: "Quần kaki, quần jean, quần short, quần tây nam.",
            status: "active",
            position: 2,
            deleted: false
        }).save();

        const subCatPhuKienNam = await new ProductCategory({
            title: "Giày & Phụ Kiện Nam",
            parent_id: catNam._id.toString(),
            description: "Giày sneaker, ví da, thắt lưng nam tính.",
            status: "active",
            position: 3,
            deleted: false
        }).save();


        // --- NHÓM 2: THỜI TRANG NỮ (Cha lớn) ---
        const catNu = await new ProductCategory({
            title: "Thời trang Nữ",
            parent_id: "",
            description: "Thời trang đón đầu mọi xu hướng, trẻ trung và cá tính.",
            status: "active",
            position: 2,
            deleted: false
        }).save();

        const subCatAoNu = await new ProductCategory({
            title: "Áo Nữ",
            parent_id: catNu._id.toString(),
            description: "Áo sơ mi nữ, áo croptop, áo kiểu tay phồng.",
            status: "active",
            position: 1,
            deleted: false
        }).save();

        const subCatVayNu = await new ProductCategory({
            title: "Quần & Chân Váy",
            parent_id: catNu._id.toString(),
            description: "Chân váy xếp ly, quần jean cạp cao, quần short nữ.",
            status: "active",
            position: 2,
            deleted: false
        }).save();

        const subCatDamNu = await new ProductCategory({
            title: "Đầm & Váy Cưới",
            parent_id: catNu._id.toString(),
            description: "Đầm voan hoa nhí, đầm dạ hội trễ vai sang trọng.",
            status: "active",
            position: 3,
            deleted: false
        }).save();


        // --- NHÓM 3: ĐỒ CÔNG NGHỆ (Cha lớn) ---
        const catCongNghe = await new ProductCategory({
            title: "Đồ Công Nghệ",
            parent_id: "",
            description: "Thiết bị điện tử, đồ chơi số và phụ kiện thông minh.",
            status: "active",
            position: 3,
            deleted: false
        }).save();

        const subCatDevice = await new ProductCategory({
            title: "Điện Thoại & Máy Tính",
            parent_id: catCongNghe._id.toString(),
            description: "Laptop cao cấp, smartphone flagship đời mới.",
            status: "active",
            position: 1,
            deleted: false
        }).save();

        const subCatAudio = await new ProductCategory({
            title: "Thiết Bị Âm Thanh",
            parent_id: catCongNghe._id.toString(),
            description: "Loa bluetooth, tai nghe chống ồn chủ động.",
            status: "active",
            position: 2,
            deleted: false
        }).save();

        const subCatElecAccessory = await new ProductCategory({
            title: "Phụ Kiện Điện Tử",
            parent_id: catCongNghe._id.toString(),
            description: "Bàn phím cơ, chuột gaming, đế sạc không dây.",
            status: "active",
            position: 3,
            deleted: false
        }).save();

        console.log("✅ Đã khởi tạo hoàn thành 3 Danh mục cha lớn và 10 Danh mục con liên kết parent_id chuẩn chỉnh!");


        // ================= GIAI ĐOẠN 2: THUẬT TOÁN SINH TỰ ĐỘNG 70 SẢN PHẨM PHONG PHÚ =================
        console.log("⏳ Đang sử dụng thuật toán thông minh sinh tự động 70 sản phẩm đa dạng chất lượng cao...");

        // Thư viện hình ảnh sắc nét phân loại theo danh mục
        const imageLibrary = {
            aoNam: [
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
            ],
            quanNam: [
                "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
            ],
            phuKienNam: [
                "https://images.unsplash.com/photo-1525966222134-fcfa99dd8ec7?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1627124793180-26a386c3e37a?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?auto=format&fit=crop&w=600&q=80"
            ],
            aoNu: [
                "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1554412930-e96f13a40807?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=600&q=80"
            ],
            vayNu: [
                "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1551163944-7f6a224c1138?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=600&q=80"
            ],
            damNu: [
                "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80"
            ],
            device: [
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1496181130204-7552cc15545a?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
            ],
            audio: [
                "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
            ],
            accessory: [
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
            ]
        };

        // Danh sách mảng từ vựng để ghép tên sản phẩm phong phú
        const vocab = {
            nouns: {
                aoNam: ["Áo Sơ Mi", "Áo Thun", "Áo Khoác Bomber", "Áo Sweater", "Áo Hoodie", "Áo Polo"],
                quanNam: ["Quần Kaki", "Quần Jeans", "Quần Short", "Quần Tây Âu", "Quần Cargo Túi Hộp"],
                phuKienNam: ["Giày Sneaker", "Ví Da Bò", "Thắt Lưng", "Kính Mát", "Đồng Hồ Cơ"],
                aoNu: ["Áo Kiểu", "Áo Croptop", "Áo Sơ Mi Nữ", "Áo Len Mỏng", "Áo Trễ Vai"],
                vayNu: ["Chân Váy Xếp Ly", "Quần Short Kaki", "Quần Jeans Cạp Cao", "Chân Váy Jean"],
                damNu: ["Đầm Hoa Nhí", "Đầm Dạ Hội", "Đầm Suông", "Đầm Body Quyến Rũ", "Váy Trắng Công Chúa"],
                device: ["Điện Thoại", "Laptop", "Máy Tính Bảng", "Đồng Hồ Thông Minh", "Màn Hình Cong"],
                audio: ["Tai Nghe Không Dây", "Loa Bluetooth", "Tai Nghe Chụp Tai", "Soundbar Gaming"],
                accessory: ["Bàn Phím Cơ", "Chuột Không Dây", "Đế Sạc Nhanh", "Tay Cầm Chơi Game", "Hub Chuyển Đổi"]
            },
            adjectives: ["Premium", "Hàn Quốc", "Classic", "Modern", "Luxury", "Basic", "Vintage", "Sport Pro", "Super Bass", "Ultra Thin", "RGB Chroma"],
            materials: ["Chất Cotton", "Vải Lụa Mềm", "Chất Kaki", "Kim Loại Nguyên Khối", "Da Thật", "Nhôm Nguyên Khối", "Vải Tuyết Mưa"]
        };

        // Thiết lập cấu hình danh mục cho vòng lặp sinh dữ liệu
        const categoriesMapping = [
            { id: subCatAoNam._id.toString(), type: "aoNam", minPrice: 15, maxPrice: 65 },
            { id: subCatQuanNam._id.toString(), type: "quanNam", minPrice: 20, maxPrice: 75 },
            { id: subCatPhuKienNam._id.toString(), type: "phuKienNam", minPrice: 15, maxPrice: 120 },
            { id: subCatAoNu._id.toString(), type: "aoNu", minPrice: 12, maxPrice: 45 },
            { id: subCatVayNu._id.toString(), type: "vayNu", minPrice: 15, maxPrice: 50 },
            { id: subCatDamNu._id.toString(), type: "damNu", minPrice: 25, maxPrice: 150 },
            { id: subCatDevice._id.toString(), type: "device", minPrice: 350, maxPrice: 1600 },
            { id: subCatAudio._id.toString(), type: "audio", minPrice: 25, maxPrice: 250 },
            { id: subCatElecAccessory._id.toString(), type: "accessory", minPrice: 15, maxPrice: 150 }
        ];

        const listProducts = [];
        const TOTAL_PRODUCTS = 70;

        for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
            // Chọn ngẫu nhiên một danh mục con
            const catConfig = categoriesMapping[Math.floor(Math.random() * categoriesMapping.length)];
            
            // Tạo tên sản phẩm ngẫu nhiên kết hợp từ vựng
            const nounList = vocab.nouns[catConfig.type];
            const noun = nounList[Math.floor(Math.random() * nounList.length)];
            const adj = vocab.adjectives[Math.floor(Math.random() * vocab.adjectives.length)];
            const material = vocab.materials[Math.floor(Math.random() * vocab.materials.length)];
            
            // Đảm bảo tên độc nhất bằng cách thêm số index
            const title = `${noun} ${adj} ${material} v.${i}`;

            // Chọn ngẫu nhiên hình ảnh tương ứng
            const images = imageLibrary[catConfig.type] || imageLibrary.aoNam;
            const thumbnail = images[Math.floor(Math.random() * images.length)];

            // Tính toán thông số ngẫu nhiên hợp lý
            const price = Math.floor(Math.random() * (catConfig.maxPrice - catConfig.minPrice) + catConfig.minPrice);
            const discountPercentage = Math.floor(Math.random() * 20) + 5; // 5% - 25%
            const stock = Math.floor(Math.random() * 230) + 20; // 20 - 250 sản phẩm
            const featured = Math.random() > 0.75 ? "1" : "0"; // Khoảng 25% sản phẩm nổi bật

            const description = `<p>Sản phẩm <strong>${title}</strong> là dòng sản phẩm cao cấp thế hệ mới, được thiết kế đột phá mang lại trải nghiệm đỉnh cao.</p>
            <p><strong>Tính năng nổi bật:</strong></p>
            <ul>
                <li>Chất liệu ${material} chọn lọc kỹ lưỡng, bền bỉ và vô cùng thoải mái khi sử dụng.</li>
                <li>Đường nét tinh xảo, phom dáng ${adj} thời thượng đi đầu xu hướng.</li>
                <li>Đã qua kiểm định chất lượng gắt gao trước khi xuất xưởng.</li>
            </ul>
            <p>Hãy nhanh tay đặt hàng sản phẩm này để nhận ngay ưu đãi giảm giá lên tới ${discountPercentage}% chỉ có trong tuần này!</p>`;

            listProducts.push({
                title: title,
                product_category_id: catConfig.id,
                description: description,
                price: price,
                discountPercentage: discountPercentage,
                stock: stock,
                thumbnail: thumbnail,
                status: "active",
                featured: featured,
                position: i,
                deleted: false
            });
        }

        // Lưu tuần tự từng sản phẩm vào MongoDB để mongoose-slug-updater sinh ra slug chuẩn SEO không bị lỗi trùng lặp
        console.log(`⏳ Đang ghi tuần tự ${TOTAL_PRODUCTS} sản phẩm mẫu vào Database (Hãy đợi trong giây lát)...`);
        const insertedProducts = [];
        let count = 0;
        
        for (const item of listProducts) {
            const product = new Product(item);
            const savedProduct = await product.save();
            insertedProducts.push(savedProduct);
            count++;
            if (count % 10 === 0) {
                console.log(`   ⚡ Đã ghi thành công ${count}/${TOTAL_PRODUCTS} sản phẩm...`);
            }
        }

        console.log("\n=======================================================");
        console.log("🎉 TẤT CẢ ĐÃ KHỞI TẠO HOÀN TẤT THÀNH CÔNG VỚI DỮ LIỆU CỰC KHỦNG!");
        console.log("=======================================================");
        console.log(`- Đã tạo: 3 Danh mục cha lớn và 10 Danh mục con đa cấp parent_id.`);
        console.log(`- Đã tạo thành công: ${insertedProducts.length} sản phẩm mẫu chất lượng cao phân bổ đồng đều.`);
        console.log(`- Khoảng 25% sản phẩm được gán nhãn Nổi bật (Featured) để hiển thị lung linh trên trang chủ.`);
        console.log("=======================================================");

        // Đóng kết nối
        mongoose.connection.close();
        console.log("\n👋 Đã ngắt kết nối Database an toàn.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Có lỗi xảy ra trong quá trình khởi tạo dữ liệu:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

quickCreate();
