<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization is handled by middleware
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'assigned_user_id' => 'required|exists:users,id',
            'due_date' => 'required|date|after_or_equal:today',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
        ];
    }
    
    public function messages()
    {
        return [
            'due_date.after_or_equal' => 'The due date must be today or in the future.',
            'project_id.required' => 'Please select a project.',
            'assigned_user_id.required' => 'Please assign the task to a user.',
        ];
    }
}
