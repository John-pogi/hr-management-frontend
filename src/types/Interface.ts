export interface Employee {
    id: number;
    fullname: string;
    email: string;
    position: string;
    contact: string;
    company: Array<{ 
        id: number,
        name: string,
        code: string,
        logo: string | null,
        created_at: string,
        updated_at: string,
    }>;
    department: Array<{
        name: string
    }>;
}

export interface ApiResponse {
    data: Employee[];
}

export interface PageQuery {
  per_page: string;
  page: string;
  company: string | null;
  department: string | null;
  search: string;
  from: string | null;
  to: string | null;
  company_id: string | null;
  status: string | null;
}