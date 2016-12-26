USE [master]
GO

IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'UMLTrainer')
DROP DATABASE [UMLTrainer]
GO

USE [master]
GO

PRINT 'Creating Database...'
CREATE DATABASE [UMLTrainer]
GO
PRINT 'Database created successfully...'
GO
PRINT 'Selecting database instance...'
GO
USE [UMLTrainer]
GO
PRINT 'Creating database tables...'


CREATE TABLE [Arrow]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[EndForm]            int  NULL ,
	[StartForm]          int  NULL ,
	[LineForm]           int  NULL ,
	[Text]               nvarchar(max)  NULL 
)
go

ALTER TABLE [Arrow]
	ADD CONSTRAINT [XPKArrow] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Diagram]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Name]               nvarchar(max)  NULL ,
	[DiagramTypeId]      int  NULL 
)
go

ALTER TABLE [Diagram]
	ADD CONSTRAINT [XPKDiagram] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [DiagramType]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Name]               nvarchar(max)  NULL 
)
go

ALTER TABLE [DiagramType]
	ADD CONSTRAINT [XPKDiagramType] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Element]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Name]               nvarchar(max)  NULL ,
	[ShapeId]            int  NULL ,
	[DiagramTypeId]      int  NULL 
)
go

ALTER TABLE [Element]
	ADD CONSTRAINT [XPKElement] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Node]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[ElementId]          int  NULL ,
	[DiagramId]          int  NULL 
)
go

ALTER TABLE [Node]
	ADD CONSTRAINT [XPKNode] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [NodeValue]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Text]               nvarchar(max)  NULL ,
	[PropertyId]         int  NULL 
)
go

ALTER TABLE [NodeValue]
	ADD CONSTRAINT [XPKNodeValue] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Relation]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[ParentId]           int  NULL ,
	[ChildId]            int  NULL ,
	[ArrowId]            int  NULL 
)
go

ALTER TABLE [Relation]
	ADD CONSTRAINT [XPKRelation] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Shape]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Name]               nvarchar(max)  NULL 
)
go

ALTER TABLE [Shape]
	ADD CONSTRAINT [XPKShape] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [SystemUser]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Name]               nvarchar(80)  NULL ,
	[UserTypeId]         int  NULL 
)
go

ALTER TABLE [SystemUser]
	ADD CONSTRAINT [XPKUser] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Task]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Question]           nvarchar(max)  NULL ,
	[DiagramId]          int  NULL ,
	[TopicId]            int  NULL 
)
go

ALTER TABLE [Task]
	ADD CONSTRAINT [XPKTask] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TaskElement]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[NodeId]             int  NULL ,
	[TaskId]             int  NULL 
)
go

ALTER TABLE [TaskElement]
	ADD CONSTRAINT [XPKTaskElement] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TaskResult]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[IsPassed]           bit  NULL ,
	[TaskId]             int  NULL ,
	[UserId]             int  NULL 
)
go

ALTER TABLE [TaskResult]
	ADD CONSTRAINT [XPKTaskResult] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Test]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Question]           nvarchar(max)  NULL ,
	[IsOneAnswer]        bit  NULL 
)
go

ALTER TABLE [Test]
	ADD CONSTRAINT [XPKTest] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TestForTopic]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[TopicId]            int  NULL ,
	[TestId]             int  NULL 
)
go

ALTER TABLE [TestForTopic]
	ADD CONSTRAINT [XPKTestForTopic] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TestResult]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[UserId]             int  NULL ,
	[IsPassed]           bit  NULL ,
	[TestId]             int  NULL 
)
go

ALTER TABLE [TestResult]
	ADD CONSTRAINT [XPKTestResult] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TestVariant]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Text]               char(18)  NULL ,
	[IsCorrect]          bit  NULL ,
	[TestId]             int  NULL 
)
go

ALTER TABLE [TestVariant]
	ADD CONSTRAINT [XPKTestVariant] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Topic]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Name]               nvarchar(max)  NULL ,
	[Text]               char(18)  NULL ,
	[CreatorId]          int  NULL 
)
go

ALTER TABLE [Topic]
	ADD CONSTRAINT [XPKLection] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [UserType]
( 
	[Id]                 int  IDENTITY(1,1) ,
	[Name]               nvarchar(50)  NULL 
)
go

ALTER TABLE [UserType]
	ADD CONSTRAINT [XPKUserType] PRIMARY KEY  CLUSTERED ([Id] ASC)
go


ALTER TABLE [Diagram]
	ADD CONSTRAINT [R_10] FOREIGN KEY ([DiagramTypeId]) REFERENCES [DiagramType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Element]
	ADD CONSTRAINT [R_3] FOREIGN KEY ([ShapeId]) REFERENCES [Shape]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Element]
	ADD CONSTRAINT [R_33] FOREIGN KEY ([DiagramTypeId]) REFERENCES [DiagramType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Node]
	ADD CONSTRAINT [R_4] FOREIGN KEY ([ElementId]) REFERENCES [Element]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Node]
	ADD CONSTRAINT [R_6] FOREIGN KEY ([DiagramId]) REFERENCES [Diagram]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [NodeValue]
	ADD CONSTRAINT [R_5] FOREIGN KEY ([PropertyId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Relation]
	ADD CONSTRAINT [R_7] FOREIGN KEY ([ParentId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Relation]
	ADD CONSTRAINT [R_8] FOREIGN KEY ([ChildId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Relation]
	ADD CONSTRAINT [R_9] FOREIGN KEY ([ArrowId]) REFERENCES [Arrow]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [SystemUser]
	ADD CONSTRAINT [R_20] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Task]
	ADD CONSTRAINT [R_13] FOREIGN KEY ([DiagramId]) REFERENCES [Diagram]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Task]
	ADD CONSTRAINT [R_17] FOREIGN KEY ([TopicId]) REFERENCES [Topic]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TaskElement]
	ADD CONSTRAINT [R_12] FOREIGN KEY ([NodeId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [TaskElement]
	ADD CONSTRAINT [R_14] FOREIGN KEY ([TaskId]) REFERENCES [Task]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TaskResult]
	ADD CONSTRAINT [R_31] FOREIGN KEY ([TaskId]) REFERENCES [Task]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [TaskResult]
	ADD CONSTRAINT [R_34] FOREIGN KEY ([UserId]) REFERENCES [UserType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TestForTopic]
	ADD CONSTRAINT [R_30] FOREIGN KEY ([TopicId]) REFERENCES [Topic]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [TestForTopic]
	ADD CONSTRAINT [R_32] FOREIGN KEY ([TestId]) REFERENCES [Test]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TestResult]
	ADD CONSTRAINT [R_24] FOREIGN KEY ([UserId]) REFERENCES [SystemUser]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [TestResult]
	ADD CONSTRAINT [R_35] FOREIGN KEY ([TestId]) REFERENCES [Test]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TestVariant]
	ADD CONSTRAINT [R_15] FOREIGN KEY ([TestId]) REFERENCES [Test]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Topic]
	ADD CONSTRAINT [R_36] FOREIGN KEY ([CreatorId]) REFERENCES [SystemUser]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

GO
PRINT 'Tables created successfully...'
GO
PRINT 'Task successful'