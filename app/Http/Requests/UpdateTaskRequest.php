<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'sometimes|required|exists:projects,id',
            'assigned_user_id' => 'sometimes|required|exists:users,id',
            'due_date' => 'sometimes|required|date|after_or_equal:today',
            'status' => 'sometimes|required|in:pending,in_progress,completed',
            'priority' => 'sometimes|required|in:low,medium,high',
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
