/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-expect-error
import { createClient } from "@supabase/supabase-js";

// Wstaw swój URL i klucz publiczny z panelu Supabase
const supabaseUrl = "https://irslowkztsofssdzfvys.supabase.co"; // zamień na swój URL
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlyc2xvd2t6dHNvZnNzZHpmdnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODkxNTcsImV4cCI6MjA1Njk2NTE1N30.HLKDHj4zZhQ_XvKz-H3BjxsrcX71I-wPtkC-eVy5P2M"; // zamień na swój klucz

// Tworzymy instancję Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
