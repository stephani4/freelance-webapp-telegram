import http from "../../plugins/http";

export default async (files: (Array<File> | File), mode: String, onUploadProgress: Function = () => {}) => {
    const fd = new FormData();

    if (mode === 'multiple') {
        files.forEach(file => fd.set('files[]', file));
    } else {
        fd.set('files', files);
    }

    const request = await http.post('/telegram/files/upload', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    });

    return request.data;
};