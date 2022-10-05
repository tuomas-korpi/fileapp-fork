DROP TABLE IF EXISTS [dbo].[Files]
CREATE TABLE [dbo].[Files](
	[FileName] [nvarchar](200) NOT NULL,
	[OwnerId] [nvarchar](20) NOT NULL,
	[BlobURL] [nvarchar](2048) NOT NULL
) ON [PRIMARY]