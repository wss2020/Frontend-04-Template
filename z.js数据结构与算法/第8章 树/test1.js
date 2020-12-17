let array = [
    {
        "name": "一级1",
        "id": 182,
        "items": [
            {
                "name": "二级1",
                "id": 185,
                "items": [
                    {"name": "三级1", "id": 189, "items": []},
                    {"name": "三级2", "id": 190, "items": []}]
            },
            {"name": "二级2", "id": 186, "items": []}]
    },
    {
        "name": "一级2",
        "id": 183,
        "items": [
            {"name": "二级1", "id": 187, "items": []},
            {"name": "二级2", "id": 188, "items": []}
            ]
    },
    {"name": "一级3", "id": 184, "items": []}]
//
// 182         183          184
//  185          187 188
//  189 190
