export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      post_interactions: {
        Row: {
          interaction_id: number
          interaction_timestamp: string | null
          post_id: number
          user_id: string
        }
        Insert: {
          interaction_id?: never
          interaction_timestamp?: string | null
          post_id: number
          user_id: string
        }
        Update: {
          interaction_id?: never
          interaction_timestamp?: string | null
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_interactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      post_revisions: {
        Row: {
          associated_post_id: number
          content: string | null
          previous_content: string | null
          revision_id: number
          revision_timestamp: string | null
          revision_type: string
          user_id: string
        }
        Insert: {
          associated_post_id: number
          content?: string | null
          previous_content?: string | null
          revision_id?: never
          revision_timestamp?: string | null
          revision_type: string
          user_id: string
        }
        Update: {
          associated_post_id?: number
          content?: string | null
          previous_content?: string | null
          revision_id?: never
          revision_timestamp?: string | null
          revision_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_revisions_associated_post_id_fkey"
            columns: ["associated_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      posts: {
        Row: {
          like_count: number | null
          post_id: number
          post_timestamp: string | null
          reply_count: number | null
          text_content: string
          user_id: string
        }
        Insert: {
          like_count?: number | null
          post_id?: never
          post_timestamp?: string | null
          reply_count?: number | null
          text_content: string
          user_id: string
        }
        Update: {
          like_count?: number | null
          post_id?: never
          post_timestamp?: string | null
          reply_count?: number | null
          text_content?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          last_edited: string
          nickname: string
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id: string
          last_edited?: string
          nickname: string
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          last_edited?: string
          nickname?: string
          username?: string
        }
        Relationships: []
      }
      thoughts_test: {
        Row: {
          created_at: string
          id: number
          parent_thought: number | null
          text_content: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          parent_thought?: number | null
          text_content: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          parent_thought?: number | null
          text_content?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "thoughts_test_parent_post_fkey"
            columns: ["parent_thought"]
            isOneToOne: false
            referencedRelation: "thoughts_test"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thoughts_test_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profile: {
        Args: { username_input: string }
        Returns: Record<string, unknown>
      }
      get_thought_reply_count: {
        Args: { thought_id_input: number }
        Returns: number
      }
      get_thoughts_count: { Args: { username_input: string }; Returns: number }
      get_thoughts_for_user: {
        Args: { username_input: string }
        Returns: Record<string, unknown>[]
      }
      get_username_from_id: { Args: { user_id_input: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const


