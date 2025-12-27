import { createClient } from '@supabase/supabase-js';

// Cấu hình trực tiếp thông tin dự án DUHAVA AGENCY để đảm bảo kết nối
const supabaseUrl = 'https://dhcqezsrdwreobszsost.supabase.co';
const supabaseKey = 'sb_publishable_00iBoLS59mqG9Qd87I4VKQ_PWD2_tO_';

if (!supabaseUrl || !supabaseKey) {
  console.error("⚠️ LỖI KẾT NỐI: Thiếu URL hoặc Key của Supabase.");
} else {
  console.log("✅ Supabase Client đã được khởi tạo với URL:", supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseKey);